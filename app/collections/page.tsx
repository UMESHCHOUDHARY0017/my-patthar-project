import Image from "next/image";

const collections = [
  ["Marble", "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?q=80&w=1400&auto=format&fit=crop"],
  ["Granite", "https://images.unsplash.com/photo-1515263487990-61b07816b324?q=80&w=1400&auto=format&fit=crop"],
  ["Onyx", "https://images.unsplash.com/photo-1533551037358-c8f7182cdb79?q=80&w=1400&auto=format&fit=crop"],
  ["Travertine", "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?q=80&w=1400&auto=format&fit=crop"],
  ["Limestone", "https://images.unsplash.com/photo-1493666438817-866a91353ca9?q=80&w=1400&auto=format&fit=crop"],
  ["Exotic", "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1400&auto=format&fit=crop"],
];

export default function CollectionsPage() {
  return (
    <main className="mx-auto max-w-[1400px] px-4 py-14 md:px-8">
      <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">Collections</p>
      <h1 className="mt-2 text-4xl font-semibold text-white md:text-5xl">All Stone Collections</h1>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {collections.map(([title, image]) => (
          <div key={title} className="group relative overflow-hidden rounded-2xl">
            <Image
              src={image}
              alt={title}
              width={1200}
              height={900}
              className="h-80 w-full object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <p className="absolute bottom-4 left-4 text-xl font-semibold text-white">{title}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
