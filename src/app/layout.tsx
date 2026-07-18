import type { Metadata, Viewport } from "next";
import {
  Archivo,
  Geist,
  Geist_Mono,
  Noto_Sans_Malayalam,
  Source_Serif_4,
} from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/layout/Navigation";
import { ToastContainer } from "@/components/ui/Toast";
import { GlobalSearch } from "@/components/ui/GlobalSearch";
import { ServiceWorkerRegister } from "@/components/ServiceWorkerRegister";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  weight: "variable",
  axes: ["opsz"],
  display: "swap",
});

const archivoImpact = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: "variable",
  axes: ["wdth"],
  display: "swap",
});

const notoMalayalam = Noto_Sans_Malayalam({
  variable: "--font-noto-malayalam",
  subsets: ["malayalam"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "German Malayalam - Learn German, Kerala Style",
  description: "An interactive German A1 course designed for Malayalam speakers from Kerala. Learn German with fun games, Kerala cultural references, and Malayalam translations.",
  keywords: ["German", "Malayalam", "Kerala", "Learn German", "A1 German", "German for Indians"],
  authors: [{ name: "German Malayalam" }],
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F5F0E8" },
    { media: "(prefers-color-scheme: dark)", color: "#0C1811" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${sourceSerif.variable} ${archivoImpact.variable} ${notoMalayalam.variable} antialiased`}
      >
        {/* Skip to content for keyboard users */}
        <a
          href="#main-content"
          className="ag-skip-link"
        >
          Skip to content
        </a>
        {children}
        <Navigation />
        <GlobalSearch />
        <ToastContainer />
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
