"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function BuyerInquiryPage() {
  const [form, setForm] = useState({ name: "", phone: "", stone: "", budget: "", city: "" });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setStatus("");
    void (async () => {
      try {
        const response = await fetch("/api/buyer-inquiry", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (!response.ok) {
          const json = (await response.json()) as { error?: string };
          throw new Error(json.error ?? "Failed to submit inquiry");
        }
        const text = encodeURIComponent(
          `Buyer inquiry from PattharHub:%0AName: ${form.name}%0APhone: ${form.phone}%0AStone Needed: ${form.stone}%0ABudget: ${form.budget}%0ACity: ${form.city}`
        );
        window.open(`https://wa.me/917417179999?text=${text}`, "_blank", "noopener,noreferrer");
        setStatus("Inquiry submitted successfully.");
      } catch (error) {
        setStatus(error instanceof Error ? error.message : "Unable to submit inquiry.");
      } finally {
        setSubmitting(false);
      }
    })();
  }

  return (
    <main className="mx-auto max-w-[760px] px-4 py-14 md:px-8">
      <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">Buyer Inquiry</p>
      <h1 className="mt-2 text-4xl font-semibold text-white md:text-5xl">Request Stone Pricing</h1>
      <form onSubmit={handleSubmit} className="mt-8 space-y-3 rounded-2xl border border-white/10 bg-white/5 p-5">
        <Input placeholder="Full name" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} required />
        <Input placeholder="Phone number" value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} required />
        <Input placeholder="What stone do you need?" value={form.stone} onChange={(e) => setForm((p) => ({ ...p, stone: e.target.value }))} required />
        <Input placeholder="Budget (Rs / sqft)" value={form.budget} onChange={(e) => setForm((p) => ({ ...p, budget: e.target.value }))} required />
        <Input placeholder="City" value={form.city} onChange={(e) => setForm((p) => ({ ...p, city: e.target.value }))} required />
        <Button type="submit" disabled={submitting} className="w-full bg-amber-300 text-neutral-950 hover:bg-amber-200">{submitting ? "Submitting..." : "Submit on WhatsApp"}</Button>
        {status ? <p className="text-sm text-emerald-300">{status}</p> : null}
      </form>
    </main>
  );
}
