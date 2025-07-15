import React from "react";

interface SectionTitleProps {
  children: React.ReactNode;
  subtitle?: string;
}

export default function SectionTitle({ children, subtitle }: SectionTitleProps) {
  return (
    <div className="mb-6 text-center">
      <h2 className="text-2xl font-bold text-green-800 mb-1">{children}</h2>
      {subtitle && <div className="text-green-600 text-base">{subtitle}</div>}
    </div>
  );
}
// Usage: <SectionTitle subtitle="Our best sellers">Products</SectionTitle> 