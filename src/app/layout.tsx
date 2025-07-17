import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientRoot from "./ClientRoot";
import { Toaster } from "react-hot-toast";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://client1-lilac.vercel.app/'),
  title: "Rice Dealership | Premium Rice Supplier",
  description: "Premium rice varieties, trusted by families and businesses for over X years. Quality, purity, and service you can count on. Order bulk rice at the best prices from a family-owned dealership.",
  openGraph: {
    title: "Rice Dealership | Premium Rice Supplier",
    description: "Premium rice varieties, trusted by families and businesses for over X years. Quality, purity, and service you can count on. Order bulk rice at the best prices from a family-owned dealership.",
    url: "https://client1-lilac.vercel.app/",
    siteName: "Rice Dealership",
    images: [
      {
        url: "/og-image.jpg", // Place a suitable image in /public
        width: 1200,
        height: 630,
        alt: "Rice Dealership - Premium Rice Supplier",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rice Dealership | Premium Rice Supplier",
    description: "Premium rice varieties, trusted by families and businesses for over X years. Quality, purity, and service you can count on. Order bulk rice at the best prices from a family-owned dealership.",
    images: ["/og-image.jpg"],
  },
  keywords: [
    "rice dealership",
    "bulk rice order",
    "premium rice",
    "rice supplier",
    "buy rice online",
    "wholesale rice",
    "basmati",
    "sona masoori",
    "parboiled rice",
    "brown rice",
    "rice shop",
    "best rice prices",
    "family-owned business",
    "trusted rice dealer"
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}>
        <Toaster position="top-right" toastOptions={{
          style: {
            borderRadius: '12px',
            background: 'rgba(255,255,255,0.95)',
            color: '#222',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
            backdropFilter: 'blur(6px)',
          },
        }} />
        <ClientRoot>{children}</ClientRoot>
      </body>
    </html>
  );
}
