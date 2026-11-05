"use client";

import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import CoupleIntroduction from "@/components/CoupleIntroduction";
import Countdown from "@/components/Countdown";
import StoryTimeline from "@/components/StoryTimeline";
import EventCards from "@/components/EventCards";
import DayTimeline from "@/components/DayTimeline";
import Gallery from "@/components/Gallery";
import Venue from "@/components/Venue";
import Family from "@/components/Family";
import DressCode from "@/components/DressCode";
import RSVPForm from "@/components/RSVPForm";
import MusicPlayer from "@/components/MusicPlayer";
import Footer from "@/components/Footer";
import IntroGate from "@/components/IntroGate";

export default function Home() {
  return (
    <div className="relative w-full min-h-screen bg-ivory text-ink">
      <IntroGate />
      <Navigation />
      <MusicPlayer />
      <main id="invitation-main" className="relative w-full">
        <Hero />
        <CoupleIntroduction />
        <Countdown />
        <StoryTimeline />
        <EventCards />
        <DayTimeline />
        <Gallery />
        <Venue />
        <Family />
        <DressCode />
        <RSVPForm />
      </main>
      <Footer />
    </div>
  );
}
