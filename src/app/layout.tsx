import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import localFont from "next/font/local";
import { Providers } from "@/components/ui/Providers";
import { site } from "@/lib/site";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  style: ["normal", "italic"],
  axes: ["SOFT", "opsz"],
});
// Self-hosted Malayalam subset of Baloo Chettan 2 (OFL). Its "MAL " language system omits
// conjunct ligatures (akhn), so lang="ml" text showed reformed forms; that record is stripped
// from this subset so ല്ല, ന്റെ and ന്മ shape traditionally, matching the brand lettering.
const baloo = localFont({
  src: "./fonts/baloo-chettan-2-ml.woff2",
  variable: "--font-baloo",
  weight: "400 800",
  display: "swap",
});

const title = "Nalkera Foodco — Pure Goodness. Rooted in Kerala.";
const description =
  "Nalkera Coconut Oil (വെളിച്ചെണ്ണ) from Nalkera Foodco, Poochol, Kerala — bringing the essence of Kerala’s coconuts to everyday life. Enquire on WhatsApp or call +91 73560 45804.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description,
  applicationName: site.company,
  keywords: ["Nalkera", "Nalkera Foodco", "coconut oil", "വെളിച്ചെണ്ണ", "Kerala coconut oil", "Poochol", "Kerala food brand"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.company,
    title,
    description,
    locale: "en_IN",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: "Nalkera Coconut Oil bottles with the Nalkera Foodco logo" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/images/og-image.jpg"] },
};

export const viewport: Viewport = {
  themeColor: "#faf8e8",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${manrope.variable} ${fraunces.variable} ${baloo.variable}`}>
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
