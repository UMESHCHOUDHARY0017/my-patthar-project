import Link from "next/link";
import Image from "next/image";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-4 md:px-8">
        <Link href="/" className="block">
          <div className="flex items-center gap-2">
            <Image src="/logo-pattharhub.svg" alt="PattharHub logo" width={34} height={34} className="rounded-lg" />
            <div>
              <p className="text-xl font-semibold tracking-wide text-white">PattharHub</p>
              <p className="text-xs text-amber-200/80">Har Patthar, Har Jagah</p>
            </div>
          </div>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-neutral-300 md:flex">
          <Link href="/about" className="hover:text-white">
            About
          </Link>
          <Link href="/collections" className="hover:text-white">
            Collections
          </Link>
          <Link href="/buyer-inquiry" className="hover:text-white">
            Buyer Inquiry
          </Link>
          <Link href="/register-godown" className="hover:text-white">
            Register
          </Link>
          <Link href="/contact" className="hover:text-white">
            Contact
          </Link>
          <Link href="/admin" className="hover:text-white">
            Admin
          </Link>
        </nav>
        <Link
          href="/register-godown"
          className="hidden rounded-xl bg-amber-300 px-4 py-2 text-sm font-medium text-neutral-950 transition hover:bg-amber-200 md:block"
        >
          List Your Godown
        </Link>
      </div>
      <div className="mx-auto flex max-w-[1400px] gap-2 overflow-x-auto px-4 pb-3 md:hidden">
        <Link href="/collections" className="rounded-lg border border-white/15 px-3 py-1 text-xs text-neutral-200">
          Collections
        </Link>
        <Link href="/buyer-inquiry" className="rounded-lg border border-white/15 px-3 py-1 text-xs text-neutral-200">
          Inquiry
        </Link>
        <Link href="/register-godown" className="rounded-lg bg-amber-300 px-3 py-1 text-xs font-medium text-neutral-950">
          Register
        </Link>
        <Link href="/contact" className="rounded-lg border border-white/15 px-3 py-1 text-xs text-neutral-200">
          Contact
        </Link>
      </div>
    </header>
  );
}
