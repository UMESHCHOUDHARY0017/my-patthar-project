"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type FormState = {
  ownerName: string; phone: string; city: string; address: string; size: string; speciality: string; photos: string; whatsapp: string;
};
const storageKey = "pattharhub-godown-registration";

export default function RegisterGodownPage() {
  const [step, setStep] = useState(1);
  const [saved, setSaved] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<FormState>(() => {
    if (typeof window === "undefined") return { ownerName: "", phone: "", city: "", address: "", size: "", speciality: "", photos: "", whatsapp: "" };
    const raw = localStorage.getItem(storageKey);
    return raw ? (JSON.parse(raw) as FormState) : { ownerName: "", phone: "", city: "", address: "", size: "", speciality: "", photos: "", whatsapp: "" };
  });
  useEffect(() => { localStorage.setItem(storageKey, JSON.stringify(form)); }, [form]);

  function canProceed() {
    if (step === 1) return Boolean(form.ownerName.trim() && form.phone.trim() && form.city.trim());
    if (step === 2) return Boolean(form.address.trim() && form.size.trim() && form.speciality.trim());
    if (step === 3) return true;
    return Boolean(form.whatsapp.trim());
  }

  async function submitRegistration() {
    setSubmitting(true);
    setSaved("");
    try {
      const response = await fetch("/api/register-godown", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) {
        const json = (await response.json()) as { error?: string };
        throw new Error(json.error ?? "Submission failed");
      }
      setSaved("Registration saved successfully. Our onboarding team will contact you on WhatsApp.");
    } catch (error) {
      setSaved(error instanceof Error ? error.message : "Could not submit registration.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="mx-auto max-w-[900px] px-4 py-14 md:px-8">
      <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">Godown Registration</p>
      <h1 className="mt-2 text-4xl font-semibold text-white md:text-5xl">List Your Godown</h1>
      <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5">
        <div className="mb-4 grid grid-cols-4 gap-2">
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className={`h-1.5 rounded-full ${n <= step ? "bg-amber-300" : "bg-white/10"}`}
            />
          ))}
        </div>
        <p className="mb-4 text-sm text-amber-200">Step {step} of 4</p>
        {step === 1 && <div className="space-y-3"><Input placeholder="Owner name" value={form.ownerName} onChange={(e) => setForm((p) => ({ ...p, ownerName: e.target.value }))} /><Input placeholder="Phone number" value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} /><Input placeholder="City" value={form.city} onChange={(e) => setForm((p) => ({ ...p, city: e.target.value }))} /></div>}
        {step === 2 && <div className="space-y-3"><Input placeholder="Godown address" value={form.address} onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))} /><Input placeholder="Godown size (sqft)" value={form.size} onChange={(e) => setForm((p) => ({ ...p, size: e.target.value }))} /><Input placeholder="Speciality" value={form.speciality} onChange={(e) => setForm((p) => ({ ...p, speciality: e.target.value }))} /></div>}
        {step === 3 && <div className="space-y-3"><Input placeholder="Stock photo URLs" value={form.photos} onChange={(e) => setForm((p) => ({ ...p, photos: e.target.value }))} /><p className="text-xs text-neutral-400">Add image links for now.</p></div>}
        {step === 4 && <div className="space-y-3"><Input placeholder="WhatsApp number for leads" value={form.whatsapp} onChange={(e) => setForm((p) => ({ ...p, whatsapp: e.target.value }))} /><Button onClick={submitRegistration} disabled={submitting} className="w-full bg-amber-300 text-neutral-950 hover:bg-amber-200">{submitting ? "Submitting..." : "Complete Registration"}</Button>{saved && <p className="text-sm text-emerald-300">{saved}</p>}</div>}
        <div className="mt-5 flex gap-2"><Button variant="outline" onClick={() => setStep((p) => Math.max(1, p - 1))} disabled={step === 1}>Previous</Button><Button onClick={() => setStep((p) => Math.min(4, p + 1))} disabled={step === 4 || !canProceed()}>Next</Button></div>
      </div>
    </main>
  );
}
