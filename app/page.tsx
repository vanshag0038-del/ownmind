import { concepts } from "@/lib/concepts"
import { ConceptSection } from "@/components/concept-section"
import { InteractionsSection } from "@/components/interactions-section"

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl px-6">
      <header className="py-16 md:py-24">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#D98E3F]">{"Ledger · ASYNC'26 · Direction board"}</p>
        <h1 className="mt-4 text-balance text-6xl leading-[0.95] md:text-8xl" style={{ fontFamily: "var(--font-fraunces)" }}>
          Four ways to make <em className="text-[#D98E3F]">sovereignty</em> visible.
        </h1>
        <nav aria-label="Directions" className="mt-10 flex flex-wrap gap-2">
          {concepts.map((c) => (
            <a
              key={c.id}
              href={`#${c.id}`}
              className="rounded-full border border-[#2A2620] px-4 py-2 font-mono text-xs transition-colors hover:border-[#D98E3F] hover:text-[#D98E3F]"
            >
              {c.numeral}. {c.title}
            </a>
          ))}
        </nav>
      </header>

      {concepts.map((c) => (
        <ConceptSection key={c.id} concept={c} />
      ))}

      <InteractionsSection />

      <footer className="border-t border-[#2A2620] py-10 font-mono text-xs text-[#EDE7DA]/50">
        Mockups are AI-generated for visual direction only. Placeholder text in the images is not final copy.
      </footer>
    </main>
  )
}
