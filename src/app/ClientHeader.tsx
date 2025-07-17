"use client";
import Link from "next/link";
import { UserProfileMenu } from "./AuthProvider";

export default function ClientHeader() {
  return (
    <header className="w-full bg-green-700 text-white shadow sticky top-0 z-20">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="text-2xl font-bold tracking-tight">Rice Dealership</Link>
        <ul className="flex gap-6 text-base font-medium items-center">
          <li><Link href="/products" className="hover:underline">Products</Link></li>
          <li><Link href="/enquiry" className="hover:underline">Order Enquiry</Link></li>
          <li><Link href="/contact" className="hover:underline">Contact</Link></li>
          <UserProfileMenu />
        </ul>
      </nav>
    </header>
  );
} 