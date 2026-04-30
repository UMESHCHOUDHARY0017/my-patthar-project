"use client";

import { MessageCircle } from "lucide-react";

export function WhatsAppFloat() {
  const href =
    "https://wa.me/917417179999?text=Hi%20PattharHub%20team,%20I%20need%20help%20with%20stone%20procurement.";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-3 text-sm font-semibold text-neutral-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-400"
    >
      <MessageCircle className="h-4 w-4" />
      WhatsApp
    </a>
  );
}
