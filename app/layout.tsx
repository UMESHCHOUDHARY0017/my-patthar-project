import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { WhatsAppFloat } from "@/components/site/whatsapp-float";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pattharhub.com"),
  title: {
    default: "PattharHub | Premium Marble & Granite Marketplace",
    template: "%s | PattharHub",
  },
  description:
    "PattharHub is India's premium B2B marble and granite marketplace with verified godowns, transparent pricing, and WhatsApp-first procurement.",
  keywords: [
    "marble marketplace india",
    "granite suppliers",
    "kishangarh marble",
    "b2b stone procurement",
    "pattharhub",
  ],
  openGraph: {
    title: "PattharHub | Premium Marble & Granite Marketplace",
    description:
      "Verified inventory, direct supplier connectivity, and premium stone sourcing for builders and architects.",
    url: "https://pattharhub.com",
    siteName: "PattharHub",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PattharHub | Premium Marble & Granite Marketplace",
    description:
      "Verified inventory and direct supplier connectivity for luxury stone procurement.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-neutral-950 text-neutral-100">
        <SiteHeader />
        <div className="flex-1">{children}</div>
        <SiteFooter />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
