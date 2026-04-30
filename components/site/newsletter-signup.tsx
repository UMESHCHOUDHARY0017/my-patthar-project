"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim()) return;
    setMessage("Subscribed. You will receive weekly inventory and price alerts.");
    setEmail("");
  }

  return (
    <section className="rounded-2xl border border-amber-200/20 bg-gradient-to-r from-neutral-900 to-[#1a140b] p-5 md:p-8">
      <h3 className="text-2xl font-semibold text-white">Weekly Stone Price Updates</h3>
      <p className="mt-2 text-sm text-neutral-300">
        Join our newsletter for supply alerts, trending varieties, and new godown listings.
      </p>
      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3 md:flex-row">
        <Input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter work email"
          className="md:max-w-md"
          required
        />
        <Button type="submit" className="bg-amber-300 text-neutral-950 hover:bg-amber-200">
          Subscribe
        </Button>
      </form>
      {message ? <p className="mt-3 text-sm text-emerald-300">{message}</p> : null}
    </section>
  );
}
