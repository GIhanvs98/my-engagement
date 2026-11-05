# Gihan & Onela — Kandyan Digital Wedding Invitation

A premium, elegant, romantic digital wedding invitation website built with **Next.js 16 (App Router)**, **TypeScript**, and **Tailwind CSS v4**.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> **Note:** this project uses `next/font/google` (Cormorant Garamond, Jost, Parisienne). The very first `npm run build` or `npm run dev` needs a working internet connection to fetch these fonts once; after that they're cached locally by Next.js.

## Editing Your Wedding Details

**Everything is centralized in one file:** `src/data/wedding.ts`

Change names, the wedding date, venue, events, story chapters, gallery photos, family names, dress code, gift/bank info, and the default guest wishes all from that single object — no need to touch any component.

Key things to personalize before launch:
- `couple` — names and initials (shown in the monogram)
- `wedding.date` — ISO datetime with timezone offset; the countdown reads this directly
- `wedding.coverImage` / `heroImage` — swap in your own photos (any HTTPS image URL, or drop files in `/public/images` and reference them as `/images/yourfile.jpg`)
- `events` — ceremony + reception details, addresses, and Google Maps links
- `gallery` — your real engagement/pre-shoot/family photos
- `venue.mapEmbedUrl` — replace with your venue's actual Google Maps embed link (search venue → Share → Embed a map)
- `music.src` — drop an MP3 into `/public/audio/` and point to it (autoplay is intentionally disabled; guests tap the floating button to start it)
- `gift.bank` — the modal shows partial details by design; edit the note text if you'd rather show the full account number, or wire it to a private/authenticated endpoint instead

## Image Hosting

The placeholder photos currently point to Unsplash so the site works out of the box. Remote domains are allow-listed in `next.config.ts` — add your own image host there if you use one besides `/public`.

## Structure

```
src/
  app/            layout.tsx (SEO + Open Graph), page.tsx (assembles sections), globals.css (design tokens + animations)
  components/     one component per section (Hero, Countdown, StoryTimeline, EventCards, DayTimeline, Gallery,
                   Venue, RSVPForm, Wishes, Family, DressCode, GiftSection, MusicPlayer, ShareButton, Footer,
                   Navigation, Monogram, Ornament, Petals, ScrollReveal)
  data/wedding.ts centralized content config
  lib/utils.ts    small helpers (Google Calendar link builder, class-name merge)
public/
  manifest.json   PWA manifest
  favicon.svg
  audio/          put your background music file here
```

## RSVP & Wishes Data

The RSVP form and the guest wishes wall currently store submissions only in local component state (so the demo works without a backend). For a real event, connect the `handleSubmit` functions in `src/components/RSVPForm.tsx` and `src/components/Wishes.tsx` to a form service (e.g. a serverless function, Formspree, Airtable, or your own API route) so responses are actually saved.

## Deployment

Deploy to [Vercel](https://vercel.com/new) (recommended for Next.js), Netlify, or any Node-capable host. Update `wedding.siteUrl` in `src/data/wedding.ts` to your production URL so Open Graph/WhatsApp link previews resolve correctly.

## Personalised guest links

Add `?to=` to the link and the opening gate greets that guest, e.g.
`https://your-site.com/?to=Mr%20%26%20Mrs%20Silva` → "Dear Mr & Mrs Silva".
Tapping **Open Invitation** slides the gate open and starts the music (the tap is what lets browsers allow sound).

## Opening sequence

1. **Invitation card** — mandala, names, date, "Open Invitation", "Dear {guest}" (from `?to=`), oil-lamp strip.
2. **Cinematic film** — after the tap: slow-zoom photo (or your own muted MP4), names fading in, a sweep of white petals, and a SKIP button. Configure in `intro` inside `src/data/wedding.ts`
   (`image`, optional `video` such as `"/video/intro.mp4"`, and `seconds`).
3. The site is revealed and the music starts (the tap permits sound).

On phones the navigation is a floating icon bar at the bottom; the music button sits top-right.
# my-engagement
# my-engagement
