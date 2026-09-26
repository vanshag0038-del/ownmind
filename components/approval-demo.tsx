"use client"

import { useCallback, useEffect, useRef, useState } from "react"

const HOLD_MS = 1200
const BRASS = "#D98E3F"
const TEAL = "#2F6E62"
const RUST = "#B4472D"

type Status = "pending" | "signed" | "denied"

type Action = {
  id: string
  tool: string
  title: string
  detail: { label: string; value: string }[]
  reason: string
  status: Status
}

type AuditEntry = { index: number; label: string; hash: string; prev: string }

const initialActions: Action[] = [
  {
    id: "a1",
    tool: "email.send",
    title: "Send a follow-up email to Priya",
    detail: [
      { label: "To", value: "priya@studio.dev" },
      { label: "Subject", value: "Notes from Thursday's review" },
      { label: "Attaches", value: "review-notes.md" },
    ],
    reason: "You asked Ledger to follow up on the design review.",
    status: "pending",
  },
  {
    id: "a2",
    tool: "calendar.create",
    title: "Block time for the demo rehearsal",
    detail: [
      { label: "When", value: "Sat, 3 Oct · 16:00–17:00" },
      { label: "Calendar", value: "Personal" },
    ],
    reason: "Found in your notes: rehearse before judging.",
    status: "pending",
  },
]

const GENESIS = "0".repeat(64)

async function sha256(input: string) {
  const bytes = new TextEncoder().encode(input)
  const digest = await crypto.subtle.digest("SHA-256", bytes)
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
}

const short = (h: string) => `${h.slice(0, 6)}…${h.slice(-4)}`

export function ApprovalDemo() {
  const [actions, setActions] = useState(initialActions)
  const [log, setLog] = useState<AuditEntry[]>([])
  const [chain, setChain] = useState<"verified" | "checking">("verified")

  const pending = actions.filter((a) => a.status === "pending").length

  const lastHash = useRef(GENESIS)
  // Serialize writes so two quick signatures can't both link to the same previous hash.
  const queue = useRef<Promise<void>>(Promise.resolve())

  const record = useCallback((label: string) => {
    setChain("checking")
    queue.current = queue.current.then(async () => {
      const prev = lastHash.current
      const hash = await sha256(`${prev}|${label}|${Date.now()}`)
      lastHash.current = hash
      setLog((l) => [...l, { index: l.length + 1, label, hash, prev }])
      setChain("verified")
    })
    return queue.current
  }, [])

  const resolveAction = useCallback(
    async (id: string, status: Exclude<Status, "pending">) => {
      const action = actions.find((a) => a.id === id)
      if (!action) return
      setActions((as) => as.map((a) => (a.id === id ? { ...a, status } : a)))
      await record(`${status === "signed" ? "SIGNED" : "DENIED"} ${action.tool}`)
    },
    [actions, record],
  )

  const reset = () => {
    setActions(initialActions)
    setLog([])
    lastHash.current = GENESIS
  }

  return (
    <section
      aria-labelledby="prototype-title"
      className="border-t border-[#2A2620] py-16"
      style={{ fontFamily: "var(--font-jetbrains)" }}
    >
      <p className="text-xs uppercase tracking-[0.2em]" style={{ color: BRASS }}>
        Live prototype · Direction I
      </p>
      <h2
        id="prototype-title"
        className="mt-3 text-balance text-4xl leading-tight md:text-5xl"
        style={{ fontFamily: "var(--font-fraunces)" }}
      >
        The lock step: <em style={{ color: BRASS }}>press and hold</em> to sign.
      </h2>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#EDE7DA]/70">
        Nothing the AI proposes runs until you seal it. Hold the brass seal to sign an action, or deny it. Every
        decision is hashed and stamped on the card, and the Trust bar updates on every page.
      </p>

      <div className="mt-10 overflow-hidden rounded-lg border border-[#2A2620] bg-[#1B1813]">
        <TrustBar pending={pending} chain={chain} entries={log.length} />

        <div className="p-5 md:p-8">
          <div className="mx-auto flex max-w-3xl flex-col gap-5">
            <div className="flex items-baseline justify-between">
              <h3 className="text-2xl" style={{ fontFamily: "var(--font-fraunces)" }}>
                III. Approvals
              </h3>
              <button
                type="button"
                onClick={reset}
                className="text-xs text-[#EDE7DA]/50 underline-offset-4 hover:text-[#EDE7DA] hover:underline"
              >
                Reset demo
              </button>
            </div>
            {actions.map((a) => (
              <ActionCard
                key={a.id}
                action={a}
                onSign={() => resolveAction(a.id, "signed")}
                onDeny={() => resolveAction(a.id, "denied")}
                hash={log.find((e) => e.label.endsWith(a.tool))?.hash}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function TrustBar({ pending, chain, entries }: { pending: number; chain: "verified" | "checking"; entries: number }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-[#2A2620] bg-[#15130F] px-5 py-3 text-xs md:px-8"
    >
      <span className="flex items-center gap-2">
        <span className="size-2 rounded-full" style={{ background: TEAL }} aria-hidden />
        Local only · 0 bytes sent
      </span>
      <span className="flex items-center gap-2">
        <span
          className={`size-2 rounded-full ${chain === "checking" ? "motion-safe:animate-pulse" : ""}`}
          style={{ background: chain === "checking" ? BRASS : TEAL }}
          aria-hidden
        />
        Chain {chain === "checking" ? "hashing…" : `verified · ${entries} ${entries === 1 ? "entry" : "entries"}`}
      </span>
      <span
        className="ml-auto flex items-center gap-2 rounded-full border px-3 py-1 transition-colors"
        style={{
          borderColor: pending ? BRASS : TEAL,
          color: pending ? BRASS : "#8FC3B7",
        }}
      >
        {pending ? `${pending} awaiting signature` : "All actions resolved"}
      </span>
    </div>
  )
}

function ActionCard({
  action,
  onSign,
  onDeny,
  hash,
}: {
  action: Action
  onSign: () => void
  onDeny: () => void
  hash?: string
}) {
  const { status } = action
  const accent = status === "signed" ? TEAL : status === "denied" ? RUST : BRASS

  return (
    <article
      aria-label={action.title}
      className={`relative flex flex-col gap-5 rounded-md border bg-[#EDE7DA]/[0.03] p-5 transition-colors duration-500 sm:flex-row sm:items-center ${status !== "pending" ? "card-shake" : ""}`}
      style={{ borderColor: accent, background: status === "signed" ? "rgba(47,110,98,0.12)" : undefined }}
    >
      <div className="relative flex-1">
        {status !== "pending" && <Imprint status={status} />}
        <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.15em]">
          <span style={{ color: accent }}>
            {status === "pending" ? "Unsigned" : status === "signed" ? "Signed & executed" : "Denied"}
          </span>
          <span className="text-[#EDE7DA]/40">{action.tool}</span>
        </div>
        <h4
          className={`mt-2 text-xl leading-snug ${status === "denied" ? "text-[#EDE7DA]/40 line-through" : ""}`}
          style={{ fontFamily: "var(--font-fraunces)" }}
        >
          {action.title}
        </h4>
        <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-xs">
          {action.detail.map((d) => (
            <div key={d.label} className="contents">
              <dt className="text-[#EDE7DA]/45">{d.label}</dt>
              <dd className="text-[#EDE7DA]/85">{d.value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 text-xs italic text-[#EDE7DA]/50" style={{ fontFamily: "var(--font-fraunces)" }}>
          {action.reason}
        </p>
        {hash && (
          <p className="mt-3 text-[11px]" style={{ color: status === "signed" ? "#8FC3B7" : RUST }}>
            Recorded · {short(hash)}
          </p>
        )}
      </div>

      <div className="flex items-center gap-4 sm:flex-col">
        <WaxSeal status={status} onSealed={onSign} />
        {status === "pending" && (
          <button
            type="button"
            onClick={onDeny}
            className="rounded-full border px-4 py-1.5 text-xs transition-colors hover:bg-[#B4472D] hover:text-[#15130F]"
            style={{ borderColor: RUST, color: RUST }}
          >
            Deny
          </button>
        )}
      </div>
    </article>
  )
}

function WaxSeal({ status, onSealed }: { status: Status; onSealed: () => void }) {
  const [progress, setProgress] = useState(0)
  const [stamped, setStamped] = useState(false)
  const frame = useRef<number | null>(null)
  const start = useRef(0)

  const cancel = useCallback(() => {
    if (frame.current) cancelAnimationFrame(frame.current)
    frame.current = null
    setProgress(0)
  }, [])

  const begin = useCallback(() => {
    if (status !== "pending" || frame.current) return
    start.current = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - start.current) / HOLD_MS, 1)
      setProgress(p)
      if (p < 1) {
        frame.current = requestAnimationFrame(tick)
      } else {
        frame.current = null
        setStamped(true)
        onSealed()
      }
    }
    frame.current = requestAnimationFrame(tick)
  }, [status, onSealed])

  useEffect(() => () => cancel(), [cancel])
  useEffect(() => {
    if (status === "pending") {
      setStamped(false)
      setProgress(0)
    }
  }, [status])

  if (status === "denied") {
    return (
      <div
        className="grid size-20 place-items-center rounded-full border border-dashed text-[10px] uppercase tracking-widest"
        style={{ borderColor: RUST, color: RUST }}
      >
        Void
      </div>
    )
  }

  const signed = status === "signed"
  const r = 44
  const circ = 2 * Math.PI * r
  const pressing = progress > 0 && !signed

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        disabled={signed}
        aria-label={signed ? "Signed" : "Press and hold to sign this action"}
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId)
          begin()
        }}
        onPointerUp={cancel}
        onPointerCancel={cancel}
        onKeyDown={(e) => {
          if ((e.key === " " || e.key === "Enter") && !e.repeat) {
            e.preventDefault()
            begin()
          }
        }}
        onKeyUp={(e) => {
          if (e.key === " " || e.key === "Enter") cancel()
        }}
        onContextMenu={(e) => e.preventDefault()}
        className="relative grid size-24 touch-none select-none place-items-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[#D98E3F] focus-visible:ring-offset-4 focus-visible:ring-offset-[#1B1813] disabled:cursor-default"
      >
        <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90" aria-hidden>
          <circle cx="50" cy="50" r={r} fill="none" stroke="#2A2620" strokeWidth="3" />
          <circle
            cx="50"
            cy="50"
            r={r}
            fill="none"
            stroke={signed ? TEAL : BRASS}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={signed ? 0 : circ * (1 - progress)}
          />
        </svg>
        {stamped && (
          <span
            aria-hidden
            className="seal-ripple pointer-events-none absolute inset-0 rounded-full border-2"
            style={{ borderColor: TEAL }}
          />
        )}
        <span
          aria-hidden
          className={`relative grid size-[70px] place-items-center rounded-full text-3xl ${stamped ? "seal-slam" : "motion-safe:transition-transform motion-safe:duration-200"}`}
          style={{
            fontFamily: "var(--font-fraunces)",
            fontStyle: "italic",
            color: signed ? "#D6EDE7" : "#3A230C",
            background: signed
              ? `radial-gradient(circle at 35% 30%, #4E9A8A, ${TEAL} 55%, #1C4A41)`
              : `radial-gradient(circle at 35% 30%, #F2B870, ${BRASS} 50%, #8A5520)`,
            boxShadow: pressing
              ? "inset 0 3px 8px rgba(0,0,0,0.45)"
              : signed
                ? "inset 0 2px 6px rgba(0,0,0,0.35), 0 0 0 4px rgba(47,110,98,0.25)"
                : "0 6px 16px rgba(0,0,0,0.45), inset 0 -3px 6px rgba(0,0,0,0.25)",
            transform: stamped ? undefined : pressing ? `scale(${1 - progress * 0.12})` : "scale(1)",
          }}
        >
          L
        </span>
      </button>
      <span className="text-[10px] uppercase tracking-[0.15em]" style={{ color: signed ? "#8FC3B7" : BRASS }}>
        {signed ? "Sealed" : pressing ? "Keep holding…" : "Hold to sign"}
      </span>
    </div>
  )
}

function Imprint({ status }: { status: Exclude<Status, "pending"> }) {
  const color = status === "signed" ? "#8FC3B7" : RUST
  return (
    <div
      aria-hidden
      className="imprint-thump pointer-events-none absolute -top-1 right-0 z-10 flex flex-col items-center rounded-sm border-[3px] border-double px-3 py-1 leading-none"
      style={{ borderColor: color, color, fontFamily: "var(--font-jetbrains)" }}
    >
      <span className="text-lg font-bold tracking-[0.25em]">{status === "signed" ? "SIGNED" : "DENIED"}</span>
      <span className="mt-1 text-[9px] tracking-[0.2em]">LEDGER · LOCAL</span>
    </div>
  )
}
