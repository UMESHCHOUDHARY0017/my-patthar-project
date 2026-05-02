"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Calculator, CheckCircle2, Scale, Search, ShieldCheck } from "lucide-react";
import { stones } from "@/lib/data/stones";
import type { Marble } from "@/lib/types/marble";
import { NewsletterSignup } from "@/components/site/newsletter-signup";
import { SafeImage } from "@/components/site/safe-image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type HomeFilter = "All" | "Marble" | "Granite" | "Onyx";

export function HomePage() {
  const [stoneData, setStoneData] = useState<Marble[]>(stones);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<HomeFilter>("All");
  const [loading, setLoading] = useState(true);
  const [sqft, setSqft] = useState("100");
  const [selected, setSelected] = useState(stones[0].id);
  const [compareA, setCompareA] = useState(stones[0].id);
  const [compareB, setCompareB] = useState(stones[1].id);
  const [counts, setCounts] = useState({ godowns: 0, varieties: 0, cities: 0 });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 650);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    async function hydrateData() {
      try {
        const [stonesRes, statsRes] = await Promise.all([fetch("/api/stones"), fetch("/api/stats")]);
        if (stonesRes.ok) {
          const stonesJson = (await stonesRes.json()) as { data: Marble[] };
          if (stonesJson.data?.length) setStoneData(stonesJson.data);
        }
        if (statsRes.ok) {
          const statsJson = (await statsRes.json()) as {
            data: { godowns: number; varieties: number; cities: number };
          };
          setCounts({
            godowns: statsJson.data.godowns,
            varieties: statsJson.data.varieties,
            cities: statsJson.data.cities,
          });
        }
      } catch {
        // Use static fallback.
      }
    }
    hydrateData();
  }, []);

  const filtered = useMemo(
    () =>
      stoneData.filter((stone) => {
        const byType = filter === "All" || stone.stone_type === filter;
        const byQuery =
          !query ||
          stone.name.toLowerCase().includes(query.toLowerCase()) ||
          stone.origin.toLowerCase().includes(query.toLowerCase());
        return byType && byQuery;
      }),
    [filter, query, stoneData]
  );

  const selectedStone = stoneData.find((stone) => stone.id === selected) ?? stoneData[0];
  const compareStoneA = stoneData.find((stone) => stone.id === compareA) ?? stoneData[0];
  const compareStoneB = stoneData.find((stone) => stone.id === compareB) ?? stoneData[1];
  const totalPrice = Number(sqft || 0) * selectedStone.price_sqft;

  return (
    <main className="pb-14">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="pointer-events-none absolute inset-0 opacity-50 [background:radial-gradient(circle_at_10%_10%,#f59e0b66,transparent_26%),radial-gradient(circle_at_88%_12%,#ffffff22,transparent_35%)]" />
        <div className="relative mx-auto grid max-w-[1400px] gap-8 px-4 py-16 md:grid-cols-2 md:px-8 md:py-24">
          <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <p className="inline-flex rounded-full border border-amber-200/40 bg-amber-300/15 px-3 py-1 text-xs tracking-[0.24em] text-amber-200">
              LUXURY B2B STONE COMMERCE
            </p>
            <h1 className="text-4xl font-semibold leading-tight md:text-6xl">
              India&apos;s Premium
              <span className="block bg-gradient-to-r from-amber-100 to-amber-400 bg-clip-text text-transparent">
                Marble & Granite Marketplace
              </span>
            </h1>
            <p className="max-w-xl text-neutral-300 md:text-lg">
              Trusted by builders, architects, and procurement teams for verified inventory, price
              clarity, and direct godown connectivity.
            </p>
            <p className="text-sm text-amber-200/90">
              Har Patthar, Har Jagah - ab procurement pure confidence ke saath.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/collections"
                className="inline-flex items-center gap-2 rounded-xl bg-amber-300 px-4 py-2 text-sm font-medium text-neutral-950 transition hover:bg-amber-200"
              >
                Browse Inventory <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/register-godown"
                className="inline-flex items-center rounded-xl border border-white/20 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
              >
                Register Godown
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                [counts.godowns, "Godowns"],
                [counts.varieties, "Varieties"],
                [counts.cities, "Cities"],
              ].map(([value, label]) => (
                <div key={String(label)} className="luxury-panel rounded-xl p-3 text-center">
                  <p className="text-2xl font-semibold text-amber-100">{value}+</p>
                  <p className="text-xs text-neutral-400">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>
          <div className="luxury-panel relative overflow-hidden rounded-3xl p-2">
            <SafeImage
              src={stoneData[0].image_url}
              alt="Premium stone surface"
              width={1400}
              height={900}
              className="h-full min-h-[400px] w-full rounded-2xl object-cover"
            />
            <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/20 bg-black/45 p-3 text-sm text-neutral-200 backdrop-blur-md">
              Live Pricing. Verified Suppliers. Direct Closures.
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 py-12 md:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ["Verified Inventory", "Every listing is structured with availability and pricing range."],
            ["Faster Procurement", "Shortlist, compare, and inquire in minutes with clear data."],
            ["Enterprise Support", "Dedicated assistance for bulk and repeat purchase requirements."],
          ].map(([title, desc]) => (
            <div key={title} className="luxury-panel rounded-2xl p-5">
              <h3 className="text-xl font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-neutral-300">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 py-10 md:px-8">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-3xl font-semibold">Featured Collections</h2>
          <div className="relative w-full md:max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="pl-10"
              placeholder="Search stones by name or origin"
            />
          </div>
        </div>
        <div className="mb-5 flex flex-wrap gap-2">
          {(["All", "Marble", "Granite", "Onyx"] as const).map((item) => (
            <Button
              key={item}
              variant={filter === item ? "default" : "outline"}
              onClick={() => setFilter(item)}
              size="sm"
            >
              {item}
            </Button>
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {loading
            ? Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="h-72 animate-pulse rounded-2xl bg-white/5" />
              ))
            : filtered.map((stone) => (
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
                    className="h-48 w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="p-4">
                    <p className="text-lg font-semibold">{stone.name}</p>
                    <p className="text-sm text-neutral-400">{stone.origin}</p>
                    <p className="mt-1 text-sm text-amber-200">
                      Rs {stone.price_min} - {stone.price_max} / sqft
                    </p>
                  </div>
                </Link>
              ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-black/30 py-14">
        <div className="mx-auto grid max-w-[1400px] gap-4 px-4 md:grid-cols-3 md:px-8">
          {[
            ["1. Discover", "Filter by type, origin, budget, and availability in seconds."],
            ["2. Compare", "Compare two stones side-by-side before finalizing procurement."],
            ["3. Connect", "Submit inquiry and close directly via WhatsApp support."],
          ].map((item) => (
            <motion.div
              key={item[0]}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              viewport={{ once: true }}
              className="luxury-panel rounded-2xl p-5"
            >
              <h3 className="text-xl font-semibold">{item[0]}</h3>
              <p className="mt-2 text-sm text-neutral-300">{item[1]}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 py-14 md:px-8">
        <div className="mb-4 flex items-center gap-2">
          <Scale className="h-5 w-5 text-amber-200" />
          <h2 className="text-2xl font-semibold">Stone Comparison Tool</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {[compareStoneA, compareStoneB].map((stone, index) => (
            <div key={stone.id} className="luxury-panel rounded-2xl p-4">
              <select
                value={index === 0 ? compareA : compareB}
                onChange={(event) =>
                  index === 0 ? setCompareA(event.target.value) : setCompareB(event.target.value)
                }
                className="w-full rounded-xl border border-white/20 bg-black/50 p-2 text-sm"
              >
                {stoneData.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
              <p className="mt-3 text-lg font-semibold">{stone.name}</p>
              <p className="text-sm text-neutral-400">{stone.origin}</p>
              <p className="text-sm text-amber-200">
                Rs {stone.price_min} - {stone.price_max} / sqft
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 pb-14 md:px-8">
        <div className="luxury-panel rounded-2xl p-5">
          <div className="mb-4 flex items-center gap-2">
            <Calculator className="h-5 w-5 text-amber-200" />
            <h2 className="text-2xl font-semibold">Price Calculator</h2>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            <select
              value={selected}
              onChange={(event) => setSelected(event.target.value)}
              className="rounded-xl border border-white/20 bg-black/50 p-2 text-sm"
            >
              {stoneData.map((stone) => (
                <option key={stone.id} value={stone.id}>
                  {stone.name}
                </option>
              ))}
            </select>
            <Input
              type="number"
              min="1"
              value={sqft}
              onChange={(event) => setSqft(event.target.value)}
              placeholder="Enter sqft"
            />
            <div className="rounded-xl border border-amber-200/30 bg-amber-200/10 px-4 py-2">
              <p className="text-sm text-neutral-300">Estimated Total</p>
              <p className="text-xl font-semibold text-amber-100">
                Rs {totalPrice.toLocaleString("en-IN")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 pb-14 md:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            "PattharHub helped us close a premium 12,000 sqft order in 48 hours.",
            "Filtering and comparison workflow saved significant sourcing time.",
            "The platform looks and feels enterprise-grade for serious procurement.",
          ].map((quote) => (
            <div key={quote} className="luxury-panel rounded-2xl p-5 text-sm text-neutral-300">
              &quot;{quote}&quot;
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 pb-14 md:px-8">
        <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-amber-200/30 bg-gradient-to-r from-amber-300/20 to-black/20 p-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-semibold text-amber-100">List Your Godown on PattharHub</h2>
            <p className="text-sm text-neutral-200">
              Join verified suppliers and receive high-intent buyer leads every week.
            </p>
          </div>
          <Link
            href="/register-godown"
            className="inline-flex items-center gap-2 rounded-xl bg-amber-300 px-4 py-2 text-sm font-medium text-neutral-950 transition hover:bg-amber-200"
          >
            List Your Godown <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 pb-16 md:px-8">
        <NewsletterSignup />
      </section>

      <section className="mx-auto max-w-[1400px] px-4 pb-8 md:px-8">
        <div className="grid gap-3 md:grid-cols-3">
          <div className="luxury-panel flex items-center gap-2 rounded-xl p-3 text-sm text-neutral-300">
            <ShieldCheck className="h-4 w-4 text-amber-200" /> Verified supplier network
          </div>
          <div className="luxury-panel flex items-center gap-2 rounded-xl p-3 text-sm text-neutral-300">
            <CheckCircle2 className="h-4 w-4 text-amber-200" /> Transparent pricing ranges
          </div>
          <div className="luxury-panel flex items-center gap-2 rounded-xl p-3 text-sm text-neutral-300">
            <CheckCircle2 className="h-4 w-4 text-amber-200" /> Dedicated WhatsApp support
          </div>
        </div>
      </section>
    </main>
  );
}