"use client";

import { useState, type FormEvent } from "react";
import { rsvpMealOptions, rsvpConfig } from "@/data/wedding";
import { submitRSVP } from "@/lib/rsvpService";
import ScrollReveal from "./ScrollReveal";
import Ornament from "./Ornament";
import FloralCorner from "./FloralCorner";
import Butterfly from "./Butterfly";
import { cn } from "@/lib/utils";

const inputClasses =
  "w-full bg-transparent border-0 border-b border-champagne/40 focus:border-champagne-dark px-0.5 py-2.5 font-body text-sm text-ink placeholder:text-ink-soft/60 outline-none transition-colors";
const labelClasses = "font-body text-[11px] tracking-[0.2em] uppercase text-ink-soft";

export default function RSVPForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [attending, setAttending] = useState<"accept" | "decline" | "">("");
  const [guests, setGuests] = useState(1);
  const [mealPreference, setMealPreference] = useState(rsvpMealOptions[0]);
  const [message, setMessage] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg("");

    if (!fullName.trim() || fullName.trim().length < 2) {
      setErrorMsg("Please enter your full name.");
      return;
    }

    if (!attending) {
      setErrorMsg("Please let us know whether you will be attending.");
      return;
    }

    setSubmitting(true);

    const result = await submitRSVP({
      fullName: fullName.trim(),
      email: email.trim() || undefined,
      phone: phone.trim() || undefined,
      attending,
      guests: attending === "accept" ? guests : 0,
      mealPreference: attending === "accept" ? mealPreference : undefined,
      message: message.trim() || undefined,
    });

    setSubmitting(false);

    if (result.error) {
      setErrorMsg(result.error);
    } else {
      setSuccessMsg(
        result.message ||
          (attending === "accept"
            ? "We are thrilled to celebrate with you!"
            : "Thank you for letting us know.")
      );
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setAttending("");
    setFullName("");
    setEmail("");
    setPhone("");
    setMessage("");
    setGuests(1);
    setErrorMsg("");
  };

  return (
    <section id="rsvp" className="relative bg-cream py-24 sm:py-32 px-6 overflow-hidden">
      <FloralCorner rotate={90} className="top-0 right-0 w-36 h-36 sm:w-64 sm:h-64 opacity-80" />
      <FloralCorner rotate={270} className="bottom-0 left-0 w-36 h-36 sm:w-64 sm:h-64 opacity-80" />
      <div className="pointer-events-none absolute left-[6%] top-[14%]">
        <div className="flutter-a">
          <Butterfly className="w-8 sm:w-11" />
        </div>
      </div>

      <div className="relative max-w-xl mx-auto">
        <ScrollReveal className="text-center mb-12">
          <p className="font-body text-[11px] tracking-[0.4em] uppercase text-champagne-dark">
            Kindly Respond
          </p>
          <h2 className="font-display text-4xl sm:text-5xl text-maroon mt-3">RSVP</h2>
          <Ornament className="mt-5" />
          <p className="font-body text-sm text-ink-soft mt-5 max-w-sm mx-auto">
            We would be honoured to have you join us. Kindly respond by {rsvpConfig.deadline}.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={1}>
          <div className="bg-cream-card/95 backdrop-blur rounded-2xl p-7 sm:p-10 border border-champagne/40 shadow-[0_25px_60px_-20px_rgba(100,44,44,0.25)]">
            {submitted ? (
              <div className="text-center py-8 animate-[fadeIn_0.6s_ease]">
                <span className="font-script text-5xl text-champagne block mb-4">Thank You</span>
                <p className="font-display italic text-xl sm:text-2xl text-maroon leading-snug">
                  {successMsg}
                </p>
                <p className="font-body text-sm text-ink-soft mt-3">
                  Your response has been saved to the couple&apos;s guest registry.
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="mt-8 font-body text-xs tracking-[0.2em] uppercase text-ink-soft underline underline-offset-4 hover:text-maroon transition-colors"
                >
                  Submit another response
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {errorMsg && (
                  <div className="rounded-md bg-red-50 p-4 border border-red-200 text-red-800 text-xs font-body animate-[fadeIn_0.3s_ease]">
                    {errorMsg}
                  </div>
                )}

                <div>
                  <label className={labelClasses} htmlFor="fullName">
                    Full Name *
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className={inputClasses}
                    placeholder="Your full name"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className={labelClasses} htmlFor="email">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={inputClasses}
                      placeholder="you@example.com"
                    />
                  </div>
                  <div>
                    <label className={labelClasses} htmlFor="phone">
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={inputClasses}
                      placeholder="+94 77 123 4567"
                    />
                  </div>
                </div>

                <div>
                  <span className={labelClasses}>Will You Be Attending? *</span>
                  <div className="grid sm:grid-cols-2 gap-3 mt-3">
                    <button
                      type="button"
                      onClick={() => {
                        setAttending("accept");
                        setErrorMsg("");
                      }}
                      className={cn(
                        "rounded-xl border px-4 py-3 font-body text-sm transition-all duration-300 text-center flex items-center justify-center gap-2",
                        attending === "accept"
                          ? "border-maroon bg-maroon text-ivory shadow-md scale-[1.02]"
                          : "border-champagne/50 text-ink-soft hover:border-maroon hover:text-maroon"
                      )}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Joyfully Accept
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setAttending("decline");
                        setErrorMsg("");
                      }}
                      className={cn(
                        "rounded-xl border px-4 py-3 font-body text-sm transition-all duration-300 text-center flex items-center justify-center gap-2",
                        attending === "decline"
                          ? "border-maroon bg-maroon text-ivory shadow-md scale-[1.02]"
                          : "border-champagne/50 text-ink-soft hover:border-maroon hover:text-maroon"
                      )}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                      Regretfully Decline
                    </button>
                  </div>
                </div>

                {attending === "accept" && (
                  <div className="grid sm:grid-cols-2 gap-6 animate-[fadeIn_0.4s_ease]">
                    <div>
                      <span className={labelClasses}>Number of Guests</span>
                      <div className="mt-2.5 flex items-center gap-4">
                        <button
                          type="button"
                          onClick={() => setGuests((g) => Math.max(1, g - 1))}
                          className="h-10 w-10 rounded-full border border-champagne text-maroon hover:bg-maroon hover:text-ivory transition-colors flex items-center justify-center text-lg leading-none"
                          aria-label="Fewer guests"
                        >
                          &minus;
                        </button>
                        <span
                          className="font-display text-2xl text-maroon w-8 text-center tabular-nums"
                          aria-live="polite"
                        >
                          {guests}
                        </span>
                        <button
                          type="button"
                          onClick={() => setGuests((g) => Math.min(rsvpConfig.maxGuests, g + 1))}
                          className="h-10 w-10 rounded-full border border-champagne text-maroon hover:bg-maroon hover:text-ivory transition-colors flex items-center justify-center text-lg leading-none"
                          aria-label="More guests"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className={labelClasses} htmlFor="meal">
                        Meal Preference
                      </label>
                      <select
                        id="meal"
                        name="meal"
                        value={mealPreference}
                        onChange={(e) => setMealPreference(e.target.value)}
                        className={cn(inputClasses, "appearance-none cursor-pointer mt-1")}
                      >
                        {rsvpMealOptions.map((m) => (
                          <option key={m} value={m} className="bg-ivory text-ink">
                            {m}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                <div>
                  <label className={labelClasses} htmlFor="message">
                    Message to the Couple
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={cn(inputClasses, "resize-none")}
                    placeholder="Share your wishes, congratulations, or special notes..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-maroon bg-maroon px-6 py-3.5 font-body text-xs tracking-[0.25em] uppercase font-medium text-ivory transition-all duration-300 hover:bg-maroon-deep shadow-md disabled:opacity-60 cursor-pointer"
                >
                  {submitting ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="animate-spin h-4 w-4 text-ivory"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Sending RSVP...
                    </span>
                  ) : (
                    <>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M21 3 3 10l7 3 3 7 8-17Z" />
                      </svg>
                      Send RSVP
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
