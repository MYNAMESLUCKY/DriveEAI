import React from "react";

interface StatCardProps {
  icon?: React.ReactNode;
  value: string | number;
  label: string;
}

export default function StatCard({ icon, value, label }: StatCardProps) {
  return (
    <div className="flex flex-col items-center bg-green-50 rounded-lg shadow p-4 min-w-[100px]">
      {icon && <div className="mb-2 text-green-700">{icon}</div>}
      <span className="text-3xl font-bold text-green-700">{value}</span>
      <span className="text-green-600">{label}</span>
    </div>
  );
}
// Usage: <StatCard icon={<svg>...</svg>} value="10+" label="Years of Service" /> 