import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rice Dealership | Premium Rice Supplier",
  description: "Order premium rice varieties in bulk directly from our trusted rice dealership. Fast delivery, best prices, and top quality.",
  openGraph: {
    title: "Rice Dealership | Premium Rice Supplier",
    description: "Order premium rice varieties in bulk directly from our trusted rice dealership. Fast delivery, best prices, and top quality.",
    url: "https://yourdomain.com/",
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
    description: "Order premium rice varieties in bulk directly from our trusted rice dealership. Fast delivery, best prices, and top quality.",
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
    "best rice prices"
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
        {/* Header */}
        <header className="w-full bg-green-700 text-white shadow sticky top-0 z-20">
          <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
            <Link href="/" className="text-2xl font-bold tracking-tight">Rice Dealership</Link>
            <ul className="flex gap-6 text-base font-medium">
              <li><Link href="/products" className="hover:underline">Products</Link></li>
              <li><Link href="/enquiry" className="hover:underline">Order Enquiry</Link></li>
              <li><Link href="/contact" className="hover:underline">Contact</Link></li>
            </ul>
          </nav>
        </header>
        <main className="min-h-[80vh]">{children}</main>
        {/* WhatsApp Floating Button */}
        <a
          href="https://wa.me/919999999999"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg p-4 flex items-center justify-center transition"
          aria-label="Chat on WhatsApp"
        >
          <svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 1.85.504 3.58 1.38 5.08L2 22l5.09-1.36A9.953 9.953 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.95 7.95 0 0 1-4.09-1.13l-.29-.17-3.02.8.81-2.95-.19-.3A7.96 7.96 0 0 1 4 12c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8zm4.29-6.62c-.23-.12-1.36-.67-1.57-.75-.21-.08-.36-.12-.51.12-.15.23-.58.75-.71.9-.13.15-.26.17-.49.06-.23-.12-.97-.36-1.85-1.13-.68-.6-1.14-1.34-1.28-1.57-.13-.23-.01-.35.1-.47.1-.1.23-.26.34-.39.11-.13.15-.23.23-.38.08-.15.04-.28-.02-.39-.06-.12-.51-1.23-.7-1.68-.18-.44-.37-.38-.51-.39-.13-.01-.28-.01-.43-.01-.15 0-.39.06-.6.28-.21.22-.8.78-.8 1.9 0 1.12.82 2.2.93 2.35.12.15 1.62 2.47 3.93 3.37.55.19.98.3 1.31.38.55.14 1.05.12 1.44.07.44-.07 1.36-.56 1.55-1.1.19-.54.19-1 .13-1.1-.06-.09-.21-.15-.44-.27z"/></svg>
        </a>
        {/* Footer */}
        <footer className="w-full bg-green-800 text-green-100 py-4 text-center text-sm mt-8">
          &copy; {new Date().getFullYear()} Rice Dealership. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
// Customization: Update WhatsApp number and branding as needed.
