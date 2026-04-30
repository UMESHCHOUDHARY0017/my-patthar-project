const posts = [
  {
    title: "How to Choose Marble for Luxury Interiors",
    excerpt: "A practical guide for selecting finish, thickness, and vein pattern.",
  },
  {
    title: "Granite vs Marble: Cost and Durability Breakdown",
    excerpt: "Understand pricing, maintenance, and best-fit use cases for both.",
  },
  {
    title: "Makrana Marble Buying Checklist",
    excerpt: "What to verify before placing bulk order from a godown.",
  },
];

export default function BlogPage() {
  return (
    <main className="mx-auto max-w-[1200px] px-4 py-14 md:px-8">
      <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">Blog</p>
      <h1 className="mt-2 text-4xl font-semibold text-white md:text-5xl">
        Insights for Stone Buyers and Suppliers
      </h1>
      <div className="mt-8 space-y-4">
        {posts.map((post) => (
          <article key={post.title} className="luxury-panel rounded-2xl p-5">
            <h2 className="text-2xl font-semibold text-white">{post.title}</h2>
            <p className="mt-2 text-neutral-300">{post.excerpt}</p>
          </article>
        ))}
      </div>
      <p className="mt-8 text-sm text-neutral-400">
        New procurement and pricing insights are published every week for builders and sourcing teams.
      </p>
    </main>
  );
}
