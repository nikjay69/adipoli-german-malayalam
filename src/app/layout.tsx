import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  maximumScale: 1,
  userScalable: false,
  themeColor: "#1b2d1b",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Skip to content for keyboard users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[200] focus:bg-[#d4a520] focus:text-[#1b2d1b] focus:px-4 focus:py-2 focus:rounded-lg focus:font-bold focus:text-sm"
        >
          Skip to content
        </a>
        <main id="main-content" className="min-h-screen pb-24" role="main">
          {children}
        </main>
        <Navigation />
        <GlobalSearch />
        <ToastContainer />
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
