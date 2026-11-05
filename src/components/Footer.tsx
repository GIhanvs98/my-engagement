import { couple, wedding } from "@/data/wedding";
import ShareButton from "./ShareButton";
import Ornament from "./Ornament";
import FloralCorner from "./FloralCorner";
import FloatingHearts from "./FloatingHearts";
import Mandala from "./Mandala";
import PetalBorder from "./PetalBorder";

export default function Footer() {
  return (
    <footer className="relative bg-cocoa pt-24 pb-28 md:pb-12 px-6 text-center overflow-hidden">
      <div className="absolute top-0 inset-x-0"><PetalBorder /></div>
      <FloralCorner rotate={0} className="top-4 left-0 w-28 h-28 sm:w-52 sm:h-52 opacity-45" />
      <FloralCorner rotate={90} className="top-4 right-0 w-28 h-28 sm:w-52 sm:h-52 opacity-45" />
      <FloatingHearts count={8} />

      <div className="relative">
        <p className="font-body text-[10px] tracking-[0.4em] uppercase text-champagne-light/80">Save the Date</p>
        <p className="font-display text-4xl sm:text-5xl tracking-[0.25em] text-ivory mt-3">20 . 11 . 26</p>

        <Mandala className="w-32 h-32 mx-auto mt-8 opacity-90" />

        <Ornament className="my-6" />

        <p className="font-display text-lg sm:text-xl text-ivory/85">Thank you for being part of our special day.</p>
        <p className="font-display italic text-base text-champagne-light mt-2">&ldquo;With love, we begin forever.&rdquo;</p>

        <h2 className="font-display italic text-3xl sm:text-4xl text-ivory mt-9">
          {couple.groomFirstName} <span className="font-script not-italic text-champagne text-3xl mx-1">&amp;</span> {couple.brideFirstName}
        </h2>
        <p className="font-body text-[10px] tracking-[0.35em] uppercase text-ivory/55 mt-3">{wedding.dayOfWeek}, {wedding.displayDate}</p>

        <div className="mt-9 flex justify-center">
          <ShareButton />
        </div>

        <p className="font-body text-[11px] tracking-[0.15em] text-ivory/45 mt-12 flex items-center justify-center gap-2">
          Made with
          <svg width="14" height="13" viewBox="0 0 24 22" className="heartbeat" aria-hidden="true">
            <path d="M12 21 C 3 14, 1 9, 4 5 C 7 2, 11 3, 12 7 C 13 3, 17 2, 20 5 C 23 9, 21 14, 12 21Z" fill="#c6a664" />
          </svg>
          for our engagement day
        </p>
      </div>
    </footer>
  );
}
