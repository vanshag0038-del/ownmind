import Image from "next/image"
import { signatureInteractions } from "@/lib/concepts"

export function InteractionsSection() {
  return (
    <section className="border-t border-[#2A2620] py-16 md:py-24" aria-labelledby="interactions-title">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#2F6E62]">Works with any direction</p>
      <h2 id="interactions-title" className="mt-2 font-serif text-5xl md:text-6xl" style={{ fontFamily: "var(--font-fraunces)" }}>
        Signature <em>moments</em>
      </h2>
      <div className="mt-10 grid gap-8 md:grid-cols-3">
        {signatureInteractions.map((item) => (
          <article key={item.title} className="flex flex-col overflow-hidden rounded-lg border border-[#2A2620]">
            <Image src={item.image} alt={item.alt} width={1024} height={1024} className="aspect-square w-full object-cover" />
            <div className="flex flex-col gap-2 p-5">
              <h3 className="text-xl" style={{ fontFamily: "var(--font-fraunces)" }}>
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-[#EDE7DA]/70">{item.how}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
