"use client";

import { useState, type FormEvent } from "react";

export function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "submitted">("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitted");
  }

  if (status === "submitted") {
    return <p className="text-sm text-cream/80">You're on the list. See you at the studio.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-sm gap-2">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        placeholder="Email address"
        className="w-full rounded-sm border border-cream/30 bg-transparent px-3 py-2 text-sm text-cream placeholder:text-cream/50 focus-visible:outline-brass"
      />
      <button
        type="submit"
        className="shrink-0 rounded-sm bg-brass px-4 py-2 text-sm font-medium text-navy transition-opacity hover:opacity-90 focus-visible:outline-cream"
      >
        Sign up
      </button>
    </form>
  );
}
