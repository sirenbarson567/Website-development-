import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { BagProvider } from "@/lib/bag-context";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Studio 14 — Power in Your Nature",
  description:
    "Studio 14 is a Dubai pilates studio's activewear and lifestyle line: reformer sets, studio zip jackets, and lifestyle pieces, sold from the studio floor and online.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="font-sans">
        <BagProvider>
          <Nav />
          <main>{children}</main>
          <Footer />
        </BagProvider>
      </body>
    </html>
  );
}
