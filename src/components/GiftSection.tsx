"use client";

import { useState } from "react";
import { gift } from "@/data/wedding";
import ScrollReveal from "./ScrollReveal";
import Ornament from "./Ornament";
import FloralCorner from "./FloralCorner";

export default function GiftSection() {
  const [open, setOpen] = useState(false);

  return (
    <section className="relative overflow-hidden bg-cream py-24 sm:py-28 px-6">
      <FloralCorner rotate={0} className="top-0 left-0 w-28 h-28 sm:w-48 sm:h-48 opacity-70" />
      <FloralCorner rotate={180} className="bottom-0 right-0 w-28 h-28 sm:w-48 sm:h-48 opacity-70" />
      <ScrollReveal className="max-w-lg mx-auto text-center">
        <p className="font-body text-[11px] tracking-[0.4em] uppercase text-champagne-dark">A Small Note</p>
        <h2 className="font-display text-3xl sm:text-4xl text-maroon mt-3 leading-snug">{gift.heading}</h2>
        <Ornament className="mt-5" />
        <p className="font-body text-sm text-ink-soft mt-5 leading-relaxed">{gift.description}</p>

        <button
          onClick={() => setOpen(true)}
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-maroon/30 text-maroon px-6 py-3 text-xs tracking-[0.2em] uppercase font-medium hover:bg-maroon hover:text-ivory transition-colors"
        >
          View Gift Details
        </button>
      </ScrollReveal>

      {open && (
        <div
          className="fixed inset-0 z-[70] bg-maroon-deep/70 backdrop-blur-sm flex items-center justify-center px-6 animate-[fadeIn_0.3s_ease]"
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-ivory rounded-sm max-w-sm w-full p-7 sm:p-8 relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-ink-soft hover:text-maroon text-2xl leading-none"
              aria-label="Close"
            >
              &times;
            </button>
            <p className="font-body text-[11px] tracking-[0.25em] uppercase text-champagne-dark mb-1">Secure Details</p>
            <h3 className="font-display text-2xl text-maroon mb-5">Gift Blessing</h3>
            <dl className="space-y-3 font-body text-sm">
              <div className="flex justify-between border-b border-champagne/25 pb-2">
                <dt className="text-ink-soft">Account Name</dt>
                <dd className="text-ink font-medium">{gift.bank.accountName}</dd>
              </div>
              <div className="flex justify-between border-b border-champagne/25 pb-2">
                <dt className="text-ink-soft">Bank</dt>
                <dd className="text-ink font-medium">{gift.bank.bankName}</dd>
              </div>
              <div className="flex justify-between border-b border-champagne/25 pb-2">
                <dt className="text-ink-soft">Account No.</dt>
                <dd className="text-ink font-medium">{gift.bank.accountNumber}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-soft">Branch</dt>
                <dd className="text-ink font-medium">{gift.bank.branch}</dd>
              </div>
            </dl>
            <p className="font-body text-[11px] text-ink-soft/80 mt-5 leading-relaxed">
              Full details are shared privately upon request to protect your information — please contact us directly for the complete account number.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
