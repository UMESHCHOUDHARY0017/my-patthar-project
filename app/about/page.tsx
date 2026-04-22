import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-[1400px] px-4 py-14 md:px-8">
      <section className="grid items-center gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">About PattharHub</p>
          <h1 className="text-4xl font-semibold text-white md:text-5xl">
            Transforming Stone Trade Into a Trusted Digital Network
          </h1>
          <p className="text-neutral-300">
            PattharHub is built for India&apos;s marble and granite ecosystem where customers can
            discover real inventory and connect directly with godown owners.
          </p>
        </div>
        <Image
          src="https://images.unsplash.com/photo-1600607688969-a5bfcd646154?q=80&w=1600&auto=format&fit=crop"
          alt="Stone showroom"
          width={1400}
          height={900}
          className="h-[420px] w-full rounded-2xl object-cover"
        />
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        {[
          ["Infrastructure", "Supplier-first digital onboarding and premium listing support."],
          ["Quality Process", "Verified godown workflow and transparent buyer experience."],
          ["Scale Vision", "Expanding from Rajasthan and UP to all major stone hubs in India."],
        ].map(([title, desc]) => (
          <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="mb-2 text-xl font-semibold">{title}</h3>
            <p className="text-sm text-neutral-300">{desc}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
