import { Mail, MapPin, Phone, MessageCircle } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-[1200px] px-4 py-14 md:px-8">
      <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">Contact Us</p>
      <h1 className="mt-2 text-4xl font-semibold text-white md:text-5xl">Let&apos;s Build Together</h1>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        <div className="luxury-panel rounded-2xl p-5">
          <Phone className="mb-2 h-5 w-5 text-amber-200" />
          <p className="text-sm text-neutral-400">Phone</p>
          <a href="tel:+917417179999" className="font-semibold hover:text-white">
            +91 74171 79999
          </a>
        </div>
        <div className="luxury-panel rounded-2xl p-5">
          <Mail className="mb-2 h-5 w-5 text-amber-200" />
          <p className="text-sm text-neutral-400">Email</p>
          <a href="mailto:sales@pattharhub.com" className="font-semibold hover:text-white">
            sales@pattharhub.com
          </a>
        </div>
        <div className="luxury-panel rounded-2xl p-5">
          <MapPin className="mb-2 h-5 w-5 text-amber-200" />
          <p className="text-sm text-neutral-400">Address</p>
          <p className="font-semibold">Kishangarh, Rajasthan, India</p>
        </div>
      </div>
      <div className="mt-8 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-5">
        <div className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-emerald-300" />
          <p className="font-semibold text-emerald-100">Fastest Support on WhatsApp</p>
        </div>
        <a
          href="https://wa.me/917417179999?text=Hi%20PattharHub%20team,%20I%20need%20help%20with%20stone%20procurement."
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block text-sm text-emerald-200 underline"
        >
          Chat Now
        </a>
      </div>
    </main>
  );
}
