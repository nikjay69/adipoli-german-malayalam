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
import { BRAND_DESCRIPTION, BRAND_NAME, brandAssets } from "@/lib/brand";

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
  metadataBase: new URL("https://adipoli-german.vercel.app"),
  applicationName: BRAND_NAME,
  title: "Adipoli German · Goethe A1 course for Malayalis",
  description: BRAND_DESCRIPTION,
  keywords: [
    "German A1",
    "Goethe A1 preparation",
    "Malayalam",
    "Malayali learners",
    "German course",
  ],
  authors: [{ name: BRAND_NAME }],
  creator: BRAND_NAME,
  publisher: BRAND_NAME,
  category: "education",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: brandAssets.icons.favicon16, sizes: "16x16", type: "image/png" },
      { url: brandAssets.icons.favicon32, sizes: "32x32", type: "image/png" },
      { url: brandAssets.icons.favicon48, sizes: "48x48", type: "image/png" },
    ],
    shortcut: [{ url: brandAssets.icons.favicon48, type: "image/png" }],
    apple: [
      { url: brandAssets.icons.appleTouch, sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    siteName: BRAND_NAME,
    title: "Adipoli German · Goethe A1 course for Malayalis",
    description: BRAND_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Adipoli German · Goethe A1 course for Malayalis",
    description: BRAND_DESCRIPTION,
  },
  appleWebApp: {
    capable: true,
    title: BRAND_NAME,
    statusBarStyle: "default",
  },
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
