"use client";

import { useState, type FormEvent } from "react";
import { initialWishes } from "@/data/wedding";
import ScrollReveal from "./ScrollReveal";
import Ornament from "./Ornament";

export default function Wishes() {
  const [wishes, setWishes] = useState(initialWishes);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setWishes((w) => [
      { name, message, date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) },
      ...w,
    ]);
    setName("");
    setMessage("");
  };

  return (
    <section className="relative bg-ivory py-24 sm:py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <ScrollReveal className="text-center mb-14">
          <p className="font-body text-[11px] tracking-[0.4em] uppercase text-champagne-dark">From Our Loved Ones</p>
          <h2 className="font-display text-4xl sm:text-5xl text-maroon mt-3">Engagement Wishes</h2>
          <Ornament className="mt-5" />
        </ScrollReveal>

        <ScrollReveal delay={1}>
          <form onSubmit={handleSubmit} className="bg-cream rounded-sm p-6 sm:p-7 mb-12 border border-champagne/25">
            <p className="font-body text-xs tracking-[0.2em] uppercase text-ink-soft mb-4">Leave a Message</p>
            <div className="grid sm:grid-cols-[1fr_2fr_auto] gap-3">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="rounded-sm border border-champagne/40 bg-ivory px-3.5 py-2.5 text-sm font-body outline-none focus:border-champagne-dark"
              />
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Your wishes for the couple..."
                className="rounded-sm border border-champagne/40 bg-ivory px-3.5 py-2.5 text-sm font-body outline-none focus:border-champagne-dark"
              />
              <button
                type="submit"
                className="rounded-sm bg-maroon text-ivory px-5 py-2.5 text-xs tracking-[0.2em] uppercase font-medium hover:bg-maroon-deep transition-colors"
              >
                Post
              </button>
            </div>
          </form>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 gap-5">
          {wishes.map((wish, i) => (
            <ScrollReveal key={`${wish.name}-${i}`} delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
              <div className="h-full bg-white rounded-sm border border-champagne/20 p-6 shadow-[0_10px_30px_-18px_rgba(107,29,42,0.3)] relative">
                <span className="font-script text-4xl text-champagne/50 absolute top-2 left-4 select-none" aria-hidden="true">
                  &ldquo;
                </span>
                <p className="font-body text-sm text-ink leading-relaxed relative z-10 pt-3">{wish.message}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-body text-xs font-medium text-maroon">{wish.name}</span>
                  <span className="font-body text-[11px] text-ink-soft">{wish.date}</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
