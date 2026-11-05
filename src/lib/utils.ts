export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/** Builds a Google Calendar link (works everywhere, no download needed) */
export function googleCalendarUrl(cal: {
  title: string;
  start: string;
  end: string;
  location: string;
  description: string;
}) {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: cal.title,
    dates: `${cal.start}/${cal.end}`,
    location: cal.location,
    details: cal.description,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
