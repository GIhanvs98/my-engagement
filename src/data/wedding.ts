// ============================================================================
// CENTRAL WEDDING CONFIGURATION
// Edit every piece of wedding-specific content from this single file.
// ============================================================================

export const couple = {
  groomFirstName: "Gihan",
  groomFullName: "Gihan Viraj Silva",
  groomPhoto:
    "/wedding/hero/groom.png",
  groomRole: "Son of Mr. Ranjith & Mrs. Kusumalatha",
  groomBio:
    "The thoughtful soul with an adventurous spirit, deeply devoted to family, laughter, and building a blessed life together.",
  brideFirstName: "Onela",
  brideFullName: "Madhavee Onela Fernando",
  bridePhoto:
    "/wedding/hero/bride.png",
  brideRole: "Daughter of Mr. Calister & Mrs. Champa",
  brideBio:
    "The radiant warmth that brightens every room, full of grace, kindness, and an unwavering love that anchors them both.",
  couplePhoto: "/wedding/hero/couple.png",
  quote: "Two lives, two hearts, joined together in friendship, united forever in love.",
  initials: { groom: "G", bride: "O" },
  hashtag: "#GihanAndOnela2026",
};

export const wedding = {
  date: "2026-11-20T16:00:00+05:30", // ISO with Sri Lanka offset, used by countdown
  displayDate: "20 November 2026",
  dayOfWeek: "Friday",
  welcomeMessage:
    "Together with their families, they invite you to celebrate their special day.",
  tagline: "Two hearts, one journey, forever begins here.",
  siteUrl: "https://gihan-and-onela.wedding",
  coverImage:
    "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop",
};

export const heroImage = "/wedding/hero/couple.png";

// Opening "film" shown after the guest taps Open Invitation.
// Set introVideo to a short muted MP4 in /public (e.g. "/video/intro.mp4") to play your own film;
// otherwise the intro image plays with a slow cinematic zoom, names and falling petals.
export const intro = {
  image:
    "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop",
  video: "",
  seconds: 9,
};

export const music = {
  title: "A Thousand Years — Romantic Instrumental",
  src: "/audio/wedding-theme.mp3",
};

export const story = [
  {
    year: "February 2025",
    title: "The Beginning",
    description:
      "We first crossed paths at university. Little did we know that this meeting would become the beginning of something beautiful.",
    image:
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=1200&auto=format&fit=crop",
  },
  {
    year: "February 2026",
    title: "The First Yes",
    description:
      "A special question was asked, and she said yes! A beautiful new chapter began.",
    image: "/images/story/the-first-yes-proposal.jpg",
  },
  {
    year: "March 2026",
    title: "Our First Date",
    description:
      "Our first meeting as something more than friends, creating memories that we will cherish forever.",
    image: "/images/story/first-date.jpg",
  },
  {
    year: "November 2026",
    title: "Forever Begins",
    description:
      "Two hearts, one promise, and a lifetime of dreams. Our journey towards forever begins with our engagement.",
    image:
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=1200&auto=format&fit=crop",
  },
];

export const events = [
  {
    id: "poruwa",
    name: "Poruwa Ceremony",
    date: "Friday, 20 November 2026",
    time: "4:00 PM – 5:30 PM",
    venue: "Rockhill Reception Hall",
    address: "No. 1/3, Sri Seelalankara Mawatha, Mullegama, Habarakada, Homagama, Sri Lanka",
    description: "The traditional Sinhala nuptial ceremony blessed with sacred chants, Jayamangala Gatha, and cultural customs.",
    mapUrl: "https://share.google/sy6LpQQDbQoQCdhYx",
    calendar: {
      title: "Gihan & Onela's Poruwa Ceremony",
      start: "20261120T160000",
      end: "20261120T173000",
      location: "Rockhill Reception Hall, Homagama, Sri Lanka",
      description: "Join us as we ascend the Poruwa and exchange our sacred vows.",
    },
  },
  {
    id: "reception",
    name: "Reception & Celebration",
    date: "Friday, 20 November 2026",
    time: "7:00 PM – 10:00 PM",
    venue: "Rockhill Reception Hall",
    address: "No. 1/3, Sri Seelalankara Mawatha, Mullegama, Habarakada, Homagama, Sri Lanka",
    description: "An evening of fine dining, heartfelt toasts, live music, and timeless memories.",
    mapUrl: "https://share.google/sy6LpQQDbQoQCdhYx",
    calendar: {
      title: "Gihan & Onela's Engagement Reception",
      start: "20261120T190000",
      end: "20261120T220000",
      location: "Rockhill Reception Hall, Homagama, Sri Lanka",
      description: "Cocktails, dinner, and celebration into the night.",
    },
  },
  {
    id: "afterparty",
    name: "Midnight After Party",
    date: "Friday, 20 November 2026",
    time: "10:30 PM onwards",
    venue: "Rockhill Courtyard & Lounge",
    address: "No. 1/3, Sri Seelalankara Mawatha, Mullegama, Habarakada, Homagama, Sri Lanka",
    description: "Let loose on the dance floor under the stars with our close circle.",
    mapUrl: "https://share.google/sy6LpQQDbQoQCdhYx",
    calendar: {
      title: "Gihan & Onela's After Party",
      start: "20261120T223000",
      end: "20261121T010000",
      location: "Rockhill Reception Hall, Homagama, Sri Lanka",
      description: "Dancing and celebration into the late night.",
    },
  },
];

export const dayTimeline = [
  { time: "10:00 AM", label: "Guest Arrival", note: "Welcome guests and invite them to take their seats." },
  { time: "10:30 AM", label: "Couple's Grand Entrance", note: "The bride and groom make their grand entrance." },
  { time: "11:00 AM", label: "Traditional Blessings & Ring Exchange", note: "Exchange rings and receive blessings from parents and elders." },
  { time: "11:45 AM", label: "Cake Cutting & Toast", note: "Celebrate your engagement with cake cutting and a toast." },
  { time: "12:15 PM", label: "Photography Session", note: "Couple portraits, family photographs and group pictures." },
  { time: "1:00 PM", label: "Lunch Reception", note: "Enjoy lunch with family and friends." },
  { time: "2:00 PM", label: "Celebration & Entertainment", note: "Music, conversations and joyful moments." },
  { time: "3:00 PM", label: "Event Conclusion", note: "Thank guests and conclude the celebration." },
];

export const gallery = [
  {
    src: "/images/couple/Joyful Outdoor Proposal Moment.png",
    alt: "Joyful outdoor proposal moment",
  },
  {
    src: "/images/couple/img_1.png",
    alt: "Celebration portrait",
    tall: true,
  },
  {
    src: "/images/couple/Joyful Couple with a Colorful Bouquet.png",
    alt: "Joyful couple with a colorful bouquet",
  },
  {
    src: "/images/couple/img.png",
    alt: "Sweet moment together",
  },
  {
    src: "/images/couple/Joyful Wedding Venue Selfie.png",
    alt: "Joyful celebration selfie",
  },
  {
    src: "/images/couple/img_2.png",
    alt: "Cherished memories together",
  },
  {
    src: "/images/couple/Sunny Park Selfie with Friends.png",
    alt: "Sunny park selfie with friends",
  },
  {
    src: "/images/couple/img_3.png",
    alt: "Happy smiles together",
  },
];

export const venue = {
  name: "Rockhill Reception Hall & Caterers",
  image: "/images/venue/rockhill-venue.jpg",
  address: "No. 1/3, Sri Seelalankara Mawatha, Mullegama, Habarakada, Homagama, Sri Lanka",
  mapEmbedUrl:
    "https://www.google.com/maps?q=Rockhill+Reception+Hall+%26+Caterers+Homagama&output=embed",
  directionsUrl: "https://share.google/sy6LpQQDbQoQCdhYx",
};

export const family = {
  bride: {
    heading: "Bride's Family",
    parents: ["Mr. Calister", "Mrs. Champa"],
    note: "Daughter of",
    short: "Mr. Calister & Mrs. Champa",
  },
  groom: {
    heading: "Groom's Family",
    parents: ["Mr. Ranjith", "Mrs. Kusumalatha"],
    note: "Son of",
    short: "Mr. Ranjith & Mrs. Kusumalatha",
  },
};

export const dressCode = {
  heading: "Dress Code",
  style: "Formal / Traditional Elegance",
  description:
    "We kindly invite our guests to dress in formal or traditional attire in soft, elegant tones. Think champagne, ivory, sage, and dusty gold — and please, no pure white.",
  palette: ["#FBF6EE", "#E8D6AB", "#C6A664", "#33422E", "#A3813F"],
};

export const gift = {
  heading: "Your Presence Is the Greatest Gift",
  description:
    "Having you with us to celebrate is more than we could ask for. For those who wish to honour us further, a small blessing towards our new beginning would be received with gratitude.",
  bank: {
    accountName: "Gihan Perera & Onela Fernando",
    bankName: "Ceylon Trust Bank",
    accountNumber: "•••• •••• 4821",
    branch: "Kandy Branch",
  },
};

export const rsvpMealOptions = ["Chicken", "Fish", "Vegetarian", "Vegan / No Preference"];

export const initialWishes = [
  {
    name: "Amara & Dilan",
    message:
      "Wishing you both a lifetime filled with love, happiness and beautiful memories. So happy for you two!",
    date: "12 Aug 2026",
  },
  {
    name: "Priya Jayasinghe",
    message:
      "From the day I met you both, I knew this was forever. Congratulations, can't wait to celebrate with you!",
    date: "15 Aug 2026",
  },
  {
    name: "The Wickramasinghe Family",
    message:
      "Two beautiful souls, one beautiful journey ahead. Sending you all our love and blessings for the big day.",
    date: "18 Aug 2026",
  },
];

export const rsvpConfig = {
  enabled: true,
  deadline: "1 November 2026",
  maxGuests: 8,
};

export const nav = [
  { label: "Home", href: "#home" },
  { label: "Our Story", href: "#story" },
  { label: "Events", href: "#events" },
  { label: "Location", href: "#venue" },
  { label: "RSVP", href: "#rsvp" },
];
