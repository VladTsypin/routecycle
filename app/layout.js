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

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className={`${manrope.variable} ${plexMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
