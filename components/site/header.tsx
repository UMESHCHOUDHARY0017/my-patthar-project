import Link from "next/link";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-4 md:px-8">
        <Link href="/" className="block">
          <p className="text-xl font-semibold tracking-wide text-white">PattharHub</p>
          <p className="text-xs text-amber-200/80">Har Patthar, Har Jagah</p>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-neutral-300 md:flex">
          <Link href="/about" className="hover:text-white">
            About
          </Link>
          <Link href="/collections" className="hover:text-white">
            Collections
          </Link>
          <Link href="/projects" className="hover:text-white">
            Projects
          </Link>
          <Link href="/blog" className="hover:text-white">
            Blog
          </Link>
          <Link href="/contact" className="hover:text-white">
            Contact
          </Link>
        </nav>
        <Link href="/#register-godown" className="hidden md:block">
          <Button className="bg-amber-300 text-neutral-950 hover:bg-amber-200">List Your Godown</Button>
        </Link>
      </div>
    </header>
  );
}
