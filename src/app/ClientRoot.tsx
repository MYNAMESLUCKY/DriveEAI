"use client";
import React from "react";
import { AuthProvider } from "./AuthProvider";
import ClientHeader from "./ClientHeader";

export default function ClientRoot({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ClientHeader />
      <main className="min-h-[80vh] w-full">
        <div className="w-full px-2 sm:px-4 lg:px-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
      {/* WhatsApp floating button removed for minimalist UI */}
      {/* Footer */}
      <footer className="w-full bg-[#f5f5f5] text-gray-500 py-4 text-center text-sm mt-8 border-t border-gray-200">
        &copy; {new Date().getFullYear()} Rice Dealership. All rights reserved.
      </footer>
    </AuthProvider>
  );
} 