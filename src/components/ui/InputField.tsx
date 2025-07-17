import React from "react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function InputField({ label, error, className = "", ...props }: InputFieldProps) {
  return (
    <div className="flex flex-col gap-1 mb-2">
      <label className="font-semibold mb-1">{label}</label>
      <input
        className={`border border-green-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 ${className}`}
        {...props}
      />
      {error && <span className="text-red-600 text-xs mt-1">{error}</span>}
    </div>
  );
}
// Usage: <InputField label="Email" type="email" value={...} onChange={...} /> 