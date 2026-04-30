import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-[1400px] px-4 py-14 md:px-8">
      <section className="grid items-center gap-8 md:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">About PattharHub</p>
          <h1 className="mt-2 text-4xl font-semibold text-white md:text-5xl">
            Building India&apos;s Most Trusted Stone Procurement Platform
          </h1>
          <p className="mt-4 text-neutral-300">
            PattharHub blends premium presentation with practical B2B workflows so builders,
            architects, and sourcing teams can move from discovery to closure faster.
          </p>
        </div>
        <Image
          src="https://images.unsplash.com/photo-1600607688969-a5bfcd646154?q=80&w=1600&auto=format&fit=crop"
          alt="Premium showroom"
          width={1400}
          height={900}
          className="h-[430px] w-full rounded-2xl border border-white/10 object-cover"
        />
      </section>
      <section className="mt-10 grid gap-4 md:grid-cols-3">
        {[
          ["Verified Network", "Curated listings from serious suppliers with transparent data."],
          ["Premium Experience", "Enterprise-grade UI designed for high-value stone commerce."],
          ["Faster Conversion", "Comparison tools, calculators, and WhatsApp-first actions."],
        ].map(([title, desc]) => (
          <div key={title} className="luxury-panel rounded-2xl p-5">
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="mt-2 text-sm text-neutral-300">{desc}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
