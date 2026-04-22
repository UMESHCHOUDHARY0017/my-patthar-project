"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Search,
  Store,
  UserRound,
} from "lucide-react";
import { InventoryGrid } from "@/components/inventory/inventory-grid";
import { StoneDetailsSheet } from "@/components/inventory/stone-details-sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase/client";
import type { Marble, StoneType } from "@/lib/types/marble";

const mockMarbles: Marble[] = [
  {
    id: "1",
    name: "Statuario Elite",
    origin: "Italy",
    color: "White",
    stone_type: "Marble",
    price_sqft: 420,
    in_stock: true,
    image_url:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: "2",
    name: "Rainforest Brown",
    origin: "Rajasthan",
    color: "Brown",
    stone_type: "Marble",
    price_sqft: 175,
    in_stock: true,
    image_url:
      "https://images.unsplash.com/photo-1617104551722-3b2d51366477?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: "3",
    name: "Absolute Black Prime",
    origin: "Rajasthan",
    color: "Black",
    stone_type: "Granite",
    price_sqft: 230,
    in_stock: true,
    image_url:
      "https://images.unsplash.com/photo-1616594039964-f4c0e8fddadf?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: "4",
    name: "Bianco Carrara",
    origin: "Italy",
    color: "White",
    stone_type: "Marble",
    price_sqft: 390,
    in_stock: false,
    image_url:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: "5",
    name: "Makrana Royal White",
    origin: "Rajasthan",
    color: "White",
    stone_type: "Marble",
    price_sqft: 260,
    in_stock: true,
    image_url:
      "https://images.unsplash.com/photo-1600121848594-d8644e57abab?q=80&w=1400&auto=format&fit=crop",
  },
];

type CollectionFilter = "All" | "Makrana" | "Italian" | "Granite" | "Marble";

export default function Home() {
  const [query, setQuery] = useState("");
  const [selectedType, setSelectedType] = useState<StoneType | "All">("All");
  const [selectedCollection, setSelectedCollection] = useState<CollectionFilter>("All");
  const [marbles, setMarbles] = useState<Marble[]>(mockMarbles);
  const [selectedMarble, setSelectedMarble] = useState<Marble | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formSuccess, setFormSuccess] = useState("");
  const [form, setForm] = useState({
    owner_name: "",
    godown_name: "",
    city: "",
    stone_focus: "",
    whatsapp: "",
    notes: "",
  });

  useEffect(() => {
    async function getMarblesFromSupabase() {
      if (!supabase) return;
      const { data, error } = await supabase
        .from("marbles")
        .select(
          "id, name, origin, color, stone_type, price_sqft, in_stock, image_url, description, created_at"
        )
        .order("created_at", { ascending: false });

      if (!error && data && data.length) {
        setMarbles(data as Marble[]);
      }
    }
    getMarblesFromSupabase();
  }, []);

  const filteredMarbles = useMemo(() => {
    return marbles.filter((marble) => {
      const matchType = selectedType === "All" || marble.stone_type === selectedType;
      const matchQuery =
        !query ||
        marble.name.toLowerCase().includes(query.toLowerCase()) ||
        marble.origin.toLowerCase().includes(query.toLowerCase()) ||
        marble.color.toLowerCase().includes(query.toLowerCase());
      const name = marble.name.toLowerCase();
      const matchCollection =
        selectedCollection === "All" ||
        (selectedCollection === "Makrana" && name.includes("makrana")) ||
        (selectedCollection === "Italian" && marble.origin === "Italy") ||
        (selectedCollection === "Granite" && marble.stone_type === "Granite") ||
        (selectedCollection === "Marble" && marble.stone_type === "Marble");
      return matchType && matchQuery && matchCollection;
    });
  }, [marbles, query, selectedCollection, selectedType]);

  async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormSuccess("");
    setFormLoading(true);
    try {
      if (!supabase) throw new Error("Supabase is not configured");
      const { error } = await supabase.from("godown_registrations").insert(form);
      if (error) throw error;
      setForm({
        owner_name: "",
        godown_name: "",
        city: "",
        stone_focus: "",
        whatsapp: "",
        notes: "",
      });
      setFormSuccess("Registration received. Team PattharHub will contact you in 24 hours.");
    } catch {
      setFormSuccess("Unable to submit right now. Please try again in a minute.");
    } finally {
      setFormLoading(false);
    }
  }

  return (
    <main className="bg-neutral-950 text-neutral-100">
      <div className="border-b border-white/10 bg-gradient-to-r from-[#0a0a0a] via-[#17120b] to-[#0a0a0a]">
        <div className="mx-auto flex max-w-[1400px] gap-6 overflow-hidden px-4 py-2 text-xs tracking-wide text-amber-200/80 md:px-8">
          <span>Direct from Kishangarh</span>
          <span>Zero Commission for Buyers</span>
          <span>Verified Godowns</span>
          <span>Har Patthar, Har Jagah</span>
        </div>
      </div>

      <section className="relative overflow-hidden border-b border-white/10">
        <div className="pointer-events-none absolute inset-0 opacity-35 [background:radial-gradient(circle_at_15%_10%,#f59e0b40,transparent_30%),radial-gradient(circle_at_80%_30%,#ffffff20,transparent_40%)]" />
        <div className="relative mx-auto grid max-w-[1400px] items-center gap-10 px-4 py-16 md:grid-cols-2 md:px-8 md:py-20">
          <div className="space-y-6">
            <p className="inline-flex rounded-full border border-amber-200/20 bg-amber-300/10 px-3 py-1 text-xs tracking-[0.2em] text-amber-200">
              PATTHARHUB PREMIUM MARKETPLACE
            </p>
            <h1 className="text-4xl font-semibold leading-tight text-white md:text-6xl">
              Real Inventory for Real Stone Buyers
              <span className="block text-amber-200">हर पत्थर, हर जगह</span>
            </h1>
            <p className="max-w-xl text-neutral-300 md:text-lg">
              Customers can directly browse marble and granite collections while godown owners can
              self-register and receive verified buyer leads.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#inventory">
                <Button className="bg-amber-300 text-neutral-950 hover:bg-amber-200">
                  Browse Inventory
                </Button>
              </a>
              <a href="#register-godown">
                <Button variant="outline">Register Godown</Button>
              </a>
            </div>
            <div className="grid max-w-lg grid-cols-3 gap-3">
              <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-center">
                <p className="text-2xl font-semibold text-white">400+</p>
                <p className="text-xs text-neutral-400">Varieties Target</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-center">
                <p className="text-2xl font-semibold text-white">1L+</p>
                <p className="text-xs text-neutral-400">Sqft Network Vision</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-center">
                <p className="text-2xl font-semibold text-white">24h</p>
                <p className="text-xs text-neutral-400">Lead Response</p>
              </div>
            </div>
          </div>
          <div className="relative rounded-3xl border border-white/10 bg-white/5 p-3 backdrop-blur-xl">
            <Image
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format&fit=crop"
              alt="Premium stone texture"
              width={1200}
              height={900}
              className="h-[460px] w-full rounded-2xl object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 py-14 md:px-8">
        <div className="mb-8 grid gap-5 md:grid-cols-3">
          {[
            {
              title: "Unmatched Quality",
              desc: "Handpicked slabs, strict inspection, and premium finishes for every project.",
            },
            {
              title: "Unique Designs",
              desc: "From minimalist luxury to bold statement patterns for modern spaces.",
            },
            {
              title: "Expert Guidance",
              desc: "Assist architects, builders, and home owners in final stone selection.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
              <p className="text-sm text-neutral-300">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="collections" className="border-y border-white/10 bg-black/40">
        <div className="mx-auto max-w-[1400px] px-4 py-14 md:px-8">
          <div className="mb-7 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">Our Collections</p>
              <h2 className="text-3xl font-semibold md:text-4xl">Marble, Granite, Onyx, Exotic</h2>
            </div>
            <Button variant="outline" className="gap-2">
              View All <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Marble Collection",
                image:
                  "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?q=80&w=1400&auto=format&fit=crop",
              },
              {
                title: "Granite Collection",
                image:
                  "https://images.unsplash.com/photo-1515263487990-61b07816b324?q=80&w=1400&auto=format&fit=crop",
              },
              {
                title: "Onyx & Exotic",
                image:
                  "https://images.unsplash.com/photo-1533551037358-c8f7182cdb79?q=80&w=1400&auto=format&fit=crop",
              },
            ].map((card) => (
              <div key={card.title} className="group relative overflow-hidden rounded-2xl">
                <Image
                  src={card.image}
                  alt={card.title}
                  width={1200}
                  height={900}
                  className="h-80 w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 p-5">
                  <p className="text-xl font-semibold">{card.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="inventory" className="relative border-t border-white/10 bg-black/35 py-14">
        <div className="pointer-events-none absolute inset-0 opacity-25 [background:radial-gradient(circle_at_70%_0%,#f59e0b22,transparent_35%)]" />
        <div className="relative mx-auto w-full max-w-[1400px] space-y-6 px-4 md:px-8">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl md:p-5">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              {(["All", "Marble", "Granite"] as const).map((type) => (
                <Button
                  key={type}
                  size="sm"
                  variant={selectedType === type ? "default" : "outline"}
                  onClick={() => setSelectedType(type)}
                >
                  {type}
                </Button>
              ))}
            </div>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-neutral-400">
                  Customer Marketplace
                </p>
                <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                  Click Makrana, Italian, Marble or Granite and view only that
                </h2>
              </div>
              <div className="relative w-full lg:max-w-md">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
                <Input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  className="pl-10"
                  placeholder="Search by name, origin, color..."
                />
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {(["All", "Makrana", "Italian", "Marble", "Granite"] as const).map((item) => (
                <button
                  key={item}
                  className={`rounded-full border px-3 py-1 text-sm transition ${
                    selectedCollection === item
                      ? "border-amber-200/60 bg-amber-200/20 text-amber-100"
                      : "border-white/15 bg-transparent text-neutral-300 hover:bg-white/10"
                  }`}
                  onClick={() => setSelectedCollection(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <InventoryGrid
            marbles={filteredMarbles}
            onSelect={(marble) => {
              setSelectedMarble(marble);
              setDrawerOpen(true);
            }}
          />
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 py-14 md:px-8">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-3xl font-semibold">New Arrivals</h3>
          <Button variant="outline">Explore More</Button>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          {mockMarbles.slice(0, 4).map((m) => (
            <button
              key={m.id}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 text-left"
              onClick={() => {
                setSelectedMarble(m);
                setDrawerOpen(true);
              }}
            >
              <Image
                src={m.image_url}
                alt={m.name}
                width={900}
                height={700}
                className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="p-4">
                <p className="font-semibold">{m.name}</p>
                <p className="text-sm text-neutral-400">{m.origin}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section id="projects" className="border-y border-white/10 bg-black/35 py-14">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <h3 className="mb-6 text-3xl font-semibold">Projects & Trusted Partners</h3>
          <div className="grid gap-4 md:grid-cols-4">
            {[
              "Adani Realty",
              "Piramal Realty",
              "Runwal Group",
              "Oberoi Realty",
              "Kalpataru",
              "K Raheja Corp",
              "Ashwin Sheth",
              "Marathon",
            ].map((brand) => (
              <div key={brand} className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
                <Building2 className="mx-auto mb-2 h-5 w-5 text-amber-200" />
                <p className="text-sm text-neutral-200">{brand}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 py-14 md:px-8">
        <h3 className="mb-4 text-2xl font-semibold">Connect with Featured Godowns</h3>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { name: "Sharma Makrana House", city: "Kishangarh", phone: "919876543210" },
            { name: "Rajput Granite Hub", city: "Jaipur", phone: "919999111222" },
            { name: "Italian Stone Gallery", city: "Udaipur", phone: "918888222333" },
          ].map((godown) => (
            <div key={godown.name} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-lg font-semibold">{godown.name}</p>
              <p className="mb-4 text-sm text-neutral-400">{godown.city}</p>
              <a
                href={`https://wa.me/${godown.phone}?text=${encodeURIComponent(`Hi, I saw ${godown.name} on PattharHub and want details.`)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="w-full bg-emerald-400 text-neutral-900 hover:bg-emerald-300">
                  WhatsApp Godown
                </Button>
              </a>
            </div>
          ))}
        </div>
      </section>

      <section id="register-godown" className="border-y border-white/10 bg-black/40 py-14">
        <div className="mx-auto grid max-w-[1400px] gap-8 px-4 md:grid-cols-2 md:px-8">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">For Godown Owners</p>
            <h2 className="text-3xl font-semibold md:text-4xl">
              Register your godown and start receiving direct buyer leads
            </h2>
            <p className="text-neutral-300">
              List your stock profile, city and WhatsApp. Customers view stones and connect
              directly without middlemen.
            </p>
            <div className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-2 text-sm text-neutral-200">
                <Store className="h-4 w-4 text-amber-200" />
                Godown-first onboarding
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-200">
                <UserRound className="h-4 w-4 text-amber-200" />
                Easy self registration
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-200">
                <MessageCircle className="h-4 w-4 text-amber-200" />
                WhatsApp-first lead pipeline
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-200">
                <CheckCircle2 className="h-4 w-4 text-amber-200" />
                Verified listing badge workflow
              </div>
            </div>
          </div>

          <form
            onSubmit={handleRegister}
            className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-5"
          >
            <Input
              placeholder="Owner name"
              value={form.owner_name}
              onChange={(event) => setForm((prev) => ({ ...prev, owner_name: event.target.value }))}
              required
            />
            <Input
              placeholder="Godown name"
              value={form.godown_name}
              onChange={(event) => setForm((prev) => ({ ...prev, godown_name: event.target.value }))}
              required
            />
            <Input
              placeholder="City (e.g. Kishangarh)"
              value={form.city}
              onChange={(event) => setForm((prev) => ({ ...prev, city: event.target.value }))}
              required
            />
            <Input
              placeholder="Stone focus (Makrana / Italian / Granite / Mixed)"
              value={form.stone_focus}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, stone_focus: event.target.value }))
              }
              required
            />
            <Input
              placeholder="WhatsApp number"
              value={form.whatsapp}
              onChange={(event) => setForm((prev) => ({ ...prev, whatsapp: event.target.value }))}
              required
            />
            <textarea
              className="min-h-[100px] w-full rounded-xl border border-white/15 bg-neutral-900/70 px-4 py-3 text-sm text-white outline-none placeholder:text-neutral-500 focus:border-white/30"
              placeholder="Optional notes (stock volume, polish, slab sizes)"
              value={form.notes}
              onChange={(event) => setForm((prev) => ({ ...prev, notes: event.target.value }))}
            />
            <Button
              type="submit"
              disabled={formLoading}
              className="w-full bg-amber-300 text-neutral-900 hover:bg-amber-200"
            >
              {formLoading ? "Submitting..." : "Register My Godown"}
            </Button>
            {formSuccess ? <p className="text-sm text-emerald-300">{formSuccess}</p> : null}
          </form>
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-[1400px] px-4 py-14 md:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <Phone className="mb-2 h-5 w-5 text-amber-200" />
            <p className="text-sm text-neutral-400">Phone</p>
            <p className="font-semibold">+91 74171 79999</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <Mail className="mb-2 h-5 w-5 text-amber-200" />
            <p className="text-sm text-neutral-400">Email</p>
            <p className="font-semibold">sales@pattharhub.com</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <MapPin className="mb-2 h-5 w-5 text-amber-200" />
            <p className="text-sm text-neutral-400">Kishangarh HQ</p>
            <p className="font-semibold">Rajasthan, India</p>
          </div>
        </div>
      </section>

      <StoneDetailsSheet
        marble={selectedMarble}
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
      />
    </main>
  );
}
