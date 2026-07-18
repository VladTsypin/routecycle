import "./globals.css";
import { IBM_Plex_Mono, Manrope } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://vladtsypin.github.io"),
  title: "Routecycle — cycling routes without unpleasant surprises",
  description:
    "Routecycle checks OpenStreetMap data and helps plan cycling routes with clear surface, access and risk information.",
  keywords: [
    "cycling route planner",
    "bike route planner",
    "gravel routes",
    "OpenStreetMap cycling",
    "Estonia cycling routes",
    "surface and access checks",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "/routecycle/",
  },
  openGraph: {
    type: "website",
    url: "/routecycle/",
    siteName: "Routecycle",
    title: "Routecycle — cycling routes without unpleasant surprises",
    description:
      "Plan cycling routes with clear surface, access and risk information.",
  },
  twitter: {
    card: "summary",
    title: "Routecycle — cycling routes without unpleasant surprises",
    description:
      "Plan cycling routes with clear surface, access and risk information.",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Routecycle",
  applicationCategory: "TravelApplication",
  operatingSystem: "Web",
  url: "https://routecycle.com/",
  description:
    "A cycling route planner that explains surface, access and route risks before a ride.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "EUR",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className={`${manrope.variable} ${plexMono.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
      </body>
    </html>
  );
}
