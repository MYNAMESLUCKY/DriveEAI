import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  loading?: boolean;
  fullWidth?: boolean;
  href?: string;
}

export default function Button({
  children,
  variant = "primary",
  loading = false,
  fullWidth = false,
  className = "",
  href,
  ...props
}: ButtonProps) {
  const base =
    "rounded-lg font-semibold shadow px-6 py-3 transition focus:outline-none focus:ring-2 focus:ring-green-400";
  const color =
    variant === "primary"
      ? "bg-green-600 text-white hover:bg-green-700"
      : "bg-white border border-green-600 text-green-700 hover:bg-green-50";
  const width = fullWidth ? "w-full" : "";

  if (href) {
    // Render as anchor for navigation
    return (
      <a
        href={href}
        className={`${base} ${color} ${width} ${className}`}
        {...(props as any)}
      >
        {loading ? <span className="animate-spin mr-2">⏳</span> : null}
        {children}
      </a>
    );
  }

  return (
    <button
      className={`${base} ${color} ${width} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? <span className="animate-spin mr-2">⏳</span> : null}
      {children}
    </button>
  );
}
// Usage: <Button href="/enquiry">Order Enquiry</Button> or <Button>Submit</Button> 