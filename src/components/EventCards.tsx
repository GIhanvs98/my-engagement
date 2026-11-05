import { events } from "@/data/wedding";
import { googleCalendarUrl } from "@/lib/utils";
import ScrollReveal from "./ScrollReveal";
import Ornament from "./Ornament";

function MapPinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M12 21s-7-6.1-7-11.5A7 7 0 0 1 19 9.5C19 14.9 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.4" />
    </svg>
  );
}
function CalendarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3.5" y="5.5" width="17" height="15" rx="1.5" />
      <path d="M3.5 9.5h17M8 3v4M16 3v4" />
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  );
}

export default function EventCards() {
  return (
    <section id="events" className="relative bg-cream py-24 sm:py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal className="text-center mb-14 sm:mb-16">
          <p className="font-body text-[11px] tracking-[0.4em] uppercase text-champagne-dark">Join Us</p>
          <h2 className="font-display text-4xl sm:text-5xl text-maroon mt-3">Engagement Events</h2>
          <Ornament className="mt-5" />
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
          {events.map((event, i) => (
            <ScrollReveal key={event.id} delay={i === 0 ? 1 : 2}>
              <div className="card-3d group h-full bg-ivory rounded-2xl border border-champagne/50 p-7 sm:p-9 flex flex-col shadow-[0_10px_40px_-20px_rgba(107,29,42,0.25)]">
                <div className="relative mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-maroon text-champagne-light shadow-[0_10px_24px_-8px_rgba(107,29,42,0.6)]">
                  <span className="ring-pulse absolute inset-0 rounded-full bg-maroon/30" aria-hidden="true" />
                  <svg className="relative" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    {i === 0 ? (
                      <>
                        <circle cx="9" cy="14" r="4.5" />
                        <circle cx="15" cy="14" r="4.5" />
                        <path d="m9 6 1.5-2h3L15 6l-3 2.5Z" />
                      </>
                    ) : (
                      <>
                        <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
                        <circle cx="12" cy="12" r="2" />
                      </>
                    )}
                  </svg>
                </div>
                <h3 className="font-display text-xl sm:text-2xl uppercase tracking-[0.12em] text-maroon text-center mb-5">{event.name}</h3>

                <dl className="space-y-3 text-sm font-body text-ink-soft flex-1 [&>div]:justify-center [&>div]:text-center">
                  <div className="flex items-start gap-2.5">
                    <CalendarIcon />
                    <dd>{event.date}</dd>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <ClockIcon />
                    <dd>{event.time}</dd>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <MapPinIcon />
                    <div>
                      <dd className="text-ink font-medium">{event.venue}</dd>
                      <dd className="text-ink-soft">{event.address}</dd>
                    </div>
                  </div>
                </dl>

                <div className="mt-7 flex flex-wrap justify-center gap-3">
                  <a
                    href={event.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-maroon/30 text-maroon px-4 py-2 text-xs tracking-wide uppercase font-medium transition-colors hover:bg-maroon hover:text-ivory"
                  >
                    <MapPinIcon /> Directions
                  </a>
                  <a
                    href={googleCalendarUrl(event.calendar)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-champagne px-4 py-2 text-xs tracking-wide uppercase font-medium text-maroon-deep transition-colors hover:bg-champagne-dark hover:text-ivory"
                  >
                    <CalendarIcon /> Add to Calendar
                  </a>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
