import Link from "next/link";
import Image from "next/image";
import { MessageCircle } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-black/70 py-8">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-3 px-4 text-sm text-neutral-400 md:px-8">
        <div className="flex items-center gap-2">
          <Image src="/logo-pattharhub.svg" alt="PattharHub logo" width={34} height={34} className="rounded-lg" />
          <p className="text-lg font-semibold text-white">PattharHub</p>
        </div>
        <p>Premium marble and granite marketplace with direct godown connectivity.</p>
        <div className="flex flex-wrap gap-4">
          <Link href="/collections" className="hover:text-white">
            Collections
          </Link>
          <Link href="/register-godown" className="hover:text-white">
            Register Godown
          </Link>
          <Link href="/buyer-inquiry" className="hover:text-white">
            Buyer Inquiry
          </Link>
          <a
            href="https://wa.me/917417179999"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
          >
            WhatsApp
          </a>
        </div>
        <div className="mt-1 flex flex-wrap items-center gap-2 text-neutral-300">
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="rounded-lg border border-white/15 px-3 py-1.5 text-xs hover:bg-white/10">
            LinkedIn
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="rounded-lg border border-white/15 px-3 py-1.5 text-xs hover:bg-white/10">
            Facebook
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="rounded-lg border border-white/15 px-3 py-1.5 text-xs hover:bg-white/10">
            Instagram
          </a>
          <a href="https://wa.me/917417179999" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-white/15 px-3 py-1.5 text-xs hover:bg-white/10">
            <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
          </a>
        </div>
        <p>© 2026 PattharHub. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
