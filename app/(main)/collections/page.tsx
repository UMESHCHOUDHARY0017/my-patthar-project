"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { stones } from "@/lib/data/stones";
import type { Marble, StoneType } from "@/lib/types/marble";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SafeImage } from "@/components/site/safe-image";

type TypeFilter = "All" | StoneType;
type AvailabilityFilter = "All" | "Ready Stock" | "Low Stock" | "Out of Stock";

export default function CollectionsPage() {
  const [stoneData, setStoneData] = useState<Marble[]>(stones);
  const [query, setQuery] = useState("");
  const [type, setType] = useState<TypeFilter>("All");
  const [origin, setOrigin] = useState("All");
  const [priceBand, setPriceBand] = useState("All");
  const [availability, setAvailability] = useState<AvailabilityFilter>("All");

  useEffect(() => {
    void (async () => {
      try {
        const response = await fetch("/api/stones");
        if (!response.ok) return;
        const json = (await response.json()) as { data: Marble[] };
        if (json.data?.length) setStoneData(json.data);
      } catch {
        // Keep static fallback.
      }
    })();
  }, []);

  const filtered = useMemo(
    () =>
      stoneData.filter((stone) => {
        const byQuery =
          stone.name.toLowerCase().includes(query.toLowerCase()) ||
          stone.origin.toLowerCase().includes(query.toLowerCase());
        const byType = type === "All" || stone.stone_type === type;
        const byOrigin = origin === "All" || stone.origin.includes(origin);
        const byAvailability = availability === "All" || stone.availability === availability;
        const byPrice =
          priceBand === "All" ||
          (priceBand === "Under 150" && stone.price_sqft < 150) ||
          (priceBand === "150-300" && stone.price_sqft >= 150 && stone.price_sqft <= 300) ||
          (priceBand === "Above 300" && stone.price_sqft > 300);
        return byQuery && byType && byOrigin && byAvailability && byPrice;
      }),
    [availability, origin, priceBand, query, stoneData, type]
  );

  return (
    <main className="mx-auto max-w-[1400px] px-4 py-14 md:px-8">
      <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">Collections</p>
      <h1 className="mt-2 text-4xl font-semibold text-white md:text-5xl">Premium Stone Inventory</h1>
      <p className="mt-3 max-w-2xl text-neutral-300">
        Explore verified marble and granite varieties with real pricing ranges, origin details, and
        availability status.
      </p>
      <section className="luxury-panel mt-8 rounded-2xl p-4">
        <div className="grid gap-3 md:grid-cols-5">
          <div className="relative md:col-span-2">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="pl-10"
              placeholder="Search by stone name or origin"
            />
          </div>
          <select
            value={type}
            onChange={(event) => setType(event.target.value as TypeFilter)}
            className="rounded-xl border border-white/20 bg-black/60 px-3 py-2 text-sm"
          >
            <option>All</option>
            <option>Marble</option>
            <option>Granite</option>
            <option>Onyx</option>
          </select>
          <select
            value={origin}
            onChange={(event) => setOrigin(event.target.value)}
            className="rounded-xl border border-white/20 bg-black/60 px-3 py-2 text-sm"
          >
            <option>All</option>
            <option>Rajasthan</option>
            <option>Italy</option>
            <option>Andhra Pradesh</option>
            <option>Karnataka</option>
          </select>
          <select
            value={priceBand}
            onChange={(event) => setPriceBand(event.target.value)}
            className="rounded-xl border border-white/20 bg-black/60 px-3 py-2 text-sm"
          >
            <option>All</option>
            <option>Under 150</option>
            <option>150-300</option>
            <option>Above 300</option>
          </select>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {(["All", "Ready Stock", "Low Stock", "Out of Stock"] as const).map((item) => (
            <Button
              key={item}
              variant={availability === item ? "default" : "outline"}
              size="sm"
              onClick={() => setAvailability(item)}
            >
              {item}
            </Button>
          ))}
        </div>
        <p className="mt-3 text-xs text-neutral-400">{filtered.length} results found</p>
      </section>
      <section className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((stone) => (
          <Link
            key={stone.id}
            href={`/collections/${stone.id}`}
            className="group luxury-panel overflow-hidden rounded-2xl"
          >
            <SafeImage
              src={stone.image_url}
              alt={stone.name}
              width={1200}
              height={900}
              className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="p-4">
              <p className="text-lg font-semibold">{stone.name}</p>
              <p className="text-sm text-neutral-400">{stone.origin}</p>
              <p className="mt-1 text-sm text-amber-200">
                Rs {stone.price_min} - {stone.price_max} / sqft
              </p>
              <p className="text-xs text-neutral-300">Stock: {stone.availability}</p>
            </div>
          </Link>
        ))}
        {filtered.length === 0 ? (
          <div className="luxury-panel col-span-full rounded-2xl p-8 text-center text-sm text-neutral-300">
            No stones found for current filters. Try selecting `All` or changing origin/price.
          </div>
        ) : null}
      </section>
    </main>
  );
}
