import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost, Parisienne } from "next/font/google";
import "./globals.css";
import { couple, wedding } from "@/data/wedding";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const script = Parisienne({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const title = `${couple.groomFirstName} & ${couple.brideFirstName} — Engagement Invitation`;
const description = `${wedding.welcomeMessage} ${wedding.displayDate}.`;

export const metadata: Metadata = {
  metadataBase: new URL(wedding.siteUrl),
  title,
  description,
  applicationName: `${couple.groomFirstName} & ${couple.brideFirstName}`,
  keywords: ["engagement", "invitation", couple.groomFirstName, couple.brideFirstName],
  openGraph: {
    title: `${couple.groomFirstName} & ${couple.brideFirstName} ❤️`,
    description: `${wedding.displayDate} — ${wedding.welcomeMessage}`,
    url: wedding.siteUrl,
    siteName: `${couple.groomFirstName} & ${couple.brideFirstName}'s Engagement`,
    images: [{ url: wedding.coverImage, width: 1600, height: 900, alt: "Engagement cover" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${couple.groomFirstName} & ${couple.brideFirstName} ❤️`,
    description: `${wedding.displayDate} — ${wedding.welcomeMessage}`,
    images: [wedding.coverImage],
  },
  manifest: "/manifest.json",
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#6b1d2a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${cormorant.variable} ${jost.variable} ${script.variable} antialiased bg-ivory text-ink`}
      >
        {children}
      </body>
    </html>
  );
}
