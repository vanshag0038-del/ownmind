import Image from "next/image"
import type { Concept } from "@/lib/concepts"

export function ConceptSection({ concept }: { concept: Concept }) {
  return (
    <section id={concept.id} className="border-t border-[#2A2620] py-16 md:py-24" aria-labelledby={`${concept.id}-title`}>
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#D98E3F]">Direction {concept.numeral}</p>
          <h2
            id={`${concept.id}-title`}
            className="mt-2 text-5xl leading-none md:text-7xl"
            style={{ fontFamily: concept.fonts.displayVar }}
          >
            {concept.title}
          </h2>
        </div>
        <p className="max-w-md text-pretty text-[#EDE7DA]/70">{concept.tagline}</p>
      </div>

      <figure className="mt-10 overflow-hidden rounded-lg border border-[#2A2620]">
        <Image src={concept.image} alt={concept.alt} width={1600} height={1000} className="h-auto w-full" />
      </figure>

      <div className="mt-10 grid gap-10 lg:grid-cols-3">
        <div>
          <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-[#EDE7DA]/50">Palette</h3>
          <ul className="mt-4 flex flex-col gap-2">
            {concept.palette.map((s) => (
              <li key={s.hex} className="flex items-center gap-3">
                <span className="size-10 shrink-0 rounded border border-white/10" style={{ backgroundColor: s.hex }} aria-hidden="true" />
                <span className="flex flex-col">
                  <span className="text-sm">
                    {s.name} <span className="font-mono text-xs text-[#EDE7DA]/50">{s.hex}</span>
                  </span>
                  <span className="text-xs text-[#EDE7DA]/60">{s.role}</span>
                </span>
              </li>
            ))}
          </ul>

          <h3 className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-[#EDE7DA]/50">Type pairing</h3>
          <div className="mt-4 rounded border border-[#2A2620] p-4">
            <p className="text-3xl leading-tight" style={{ fontFamily: concept.fonts.displayVar }}>
              Own your AI.
            </p>
            <p className="mt-2 text-sm text-[#EDE7DA]/70" style={{ fontFamily: concept.fonts.bodyVar }}>
              {"hash = sha256(prev + event)"}
            </p>
            <p className="mt-3 font-mono text-[11px] text-[#EDE7DA]/50">
              {concept.fonts.display} / {concept.fonts.body}
            </p>
          </div>
        </div>

        <div>
          <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-[#EDE7DA]/50">Site structure</h3>
          <ol className="mt-4 flex flex-col gap-3">
            {concept.structure.map((item, i) => (
              <li key={item} className="flex gap-3 text-sm leading-relaxed">
                <span className="font-mono text-[#D98E3F]">{String(i + 1).padStart(2, "0")}</span>
                {item}
              </li>
            ))}
          </ol>
        </div>

        <div>
          <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-[#EDE7DA]/50">Interactions</h3>
          <ul className="mt-4 flex flex-col gap-3">
            {concept.interactions.map((item) => (
              <li key={item} className="border-l-2 border-[#2F6E62] pl-3 text-sm leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-8 rounded bg-[#D98E3F]/10 p-4">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#D98E3F]">Why judges notice</p>
            <p className="mt-2 text-sm leading-relaxed">{concept.whyJudges}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
