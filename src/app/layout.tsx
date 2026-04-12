import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VIU | Own The Market Before They Sell",
  description:
    "Viu uses predictive modeling to place your brand in front of homeowners up to 90 days before they decide to sell — securing your position before search even begins.",
  keywords: [
    "real estate",
    "territory ownership",
    "predictive marketing",
    "ZIP code territory",
    "brand positioning",
  ],
  openGraph: {
    title: "VIU | Own The Market Before They Sell",
    description:
      "Predictive brand positioning for elite real estate professionals.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="min-h-screen flex flex-col font-sans" suppressHydrationWarning>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
