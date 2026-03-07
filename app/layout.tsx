import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Clínica Lingual | La Verdadera Ortodoncia Invisible en Santiago",
  description:
    "Especialistas en ortodoncia lingual en Las Condes, Santiago. +5,000 tratamientos. Brackets invisibles personalizados con tecnología 3D.",
  keywords: [
    "ortodoncia lingual",
    "brackets linguales",
    "ortodoncia invisible",
    "frenillos invisibles",
    "clínica dental Las Condes",
    "ortodoncia Santiago",
    "brackets invisibles Chile",
  ],
  authors: [{ name: "Clínica Lingual" }],
  creator: "Clínica Lingual",
  publisher: "Clínica Lingual",
  metadataBase: new URL("https://clinicalingual.cl"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Clínica Lingual | La Verdadera Ortodoncia Invisible",
    description:
      "Cambia tu sonrisa sin que nadie se entere con nuestros brackets y alineadores invisibles. +5,000 tratamientos finalizados.",
    url: "https://clinicalingual.cl",
    siteName: "Clínica Lingual",
    locale: "es_CL",
    type: "website",
    images: [
      {
        url: "https://assets.cdn.filesafe.space/SKKTEbSYs4aaSrh7QW9p/media/668eb72f8edd42a40ba448f2.webp",
        width: 1200,
        height: 630,
        alt: "Clínica Lingual - Ortodoncia Invisible",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Clínica Lingual | La Verdadera Ortodoncia Invisible",
    description:
      "Cambia tu sonrisa sin que nadie se entere con nuestros brackets y alineadores invisibles.",
    images: [
      "https://assets.cdn.filesafe.space/SKKTEbSYs4aaSrh7QW9p/media/668eb72f8edd42a40ba448f2.webp",
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${playfair.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
