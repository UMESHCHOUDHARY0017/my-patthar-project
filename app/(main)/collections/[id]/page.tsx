import Link from "next/link";
import { notFound } from "next/navigation";
import { stones } from "@/lib/data/stones";
import { Button } from "@/components/ui/button";
import { SafeImage } from "@/components/site/safe-image";

export default async function StoneDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const stone = stones.find((item) => item.id === id);
  if (!stone) notFound();

  const message = encodeURIComponent(`Hi, I need ${stone.name} for my project. Please share availability.`);

  return (
    <main className="mx-auto max-w-[1200px] px-4 py-14 md:px-8">
      <div className="grid gap-6 md:grid-cols-2">
        <SafeImage src={stone.image_url} alt={stone.name} width={1200} height={900} className="h-[420px] w-full rounded-2xl border border-white/10 object-cover" />
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">{stone.stone_type}</p>
          <h1 className="text-4xl font-semibold">{stone.name}</h1>
          <p className="text-neutral-300">{stone.description}</p>
          <p className="text-sm text-neutral-400">Origin: {stone.origin}</p>
          <p className="text-sm text-amber-200">Price Range: Rs {stone.price_min} - {stone.price_max} / sqft</p>
          <p className="text-sm text-neutral-300">Availability: {stone.availability}</p>
          <div className="flex flex-wrap gap-3">
            <a href={`https://wa.me/917417179999?text=${message}`} target="_blank" rel="noopener noreferrer">
              <Button className="bg-emerald-500 text-neutral-950 hover:bg-emerald-400">Inquire on WhatsApp</Button>
            </a>
            <Link
              href="/buyer-inquiry"
              className="inline-flex items-center rounded-xl border border-white/20 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
            >
              Buyer Inquiry Form
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
