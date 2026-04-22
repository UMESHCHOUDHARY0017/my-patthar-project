import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-[1200px] px-4 py-14 md:px-8">
      <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">Contact Us</p>
      <h1 className="mt-2 text-4xl font-semibold text-white md:text-5xl">Let&apos;s Build Together</h1>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
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
          <p className="text-sm text-neutral-400">Address</p>
          <p className="font-semibold">Kishangarh, Rajasthan, India</p>
        </div>
      </div>
    </main>
  );
}
