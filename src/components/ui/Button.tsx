import React from "react";
import Link from "next/link";

type ButtonProps =
  | (React.ButtonHTMLAttributes<HTMLButtonElement> & {
      href?: undefined;
    })
  | (React.AnchorHTMLAttributes<HTMLAnchorElement> & {
      href: string;
    });

export default function Button({
  children,
  variant = "primary",
  loading = false,
  fullWidth = false,
  className = "",
  href,
  ...props
}: ButtonProps & { variant?: "primary" | "secondary"; loading?: boolean; fullWidth?: boolean }) {
  const base =
    "rounded-lg font-semibold shadow px-6 py-3 transition focus:outline-none focus:ring-2 focus:ring-green-400";
  const color =
    variant === "primary"
      ? "bg-green-600 text-white hover:bg-green-700"
      : "bg-white border border-green-600 text-green-700 hover:bg-green-50";
  const width = fullWidth ? "w-full" : "";

  if (href) {
    // Render as Next.js Link for navigation
    return (
      <Link
        href={href}
        className={`${base} ${color} ${width} ${className}`}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {loading ? <span className="animate-spin mr-2">⏳</span> : null}
        {children}
      </Link>
    );
  }

  // Only pass 'disabled' to <button>
  const { disabled, ...buttonProps } = props as React.ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button
      className={`${base} ${color} ${width} ${className}`}
      disabled={loading || disabled}
      {...buttonProps}
    >
      {loading ? <span className="animate-spin mr-2">⏳</span> : null}
      {children}
    </button>
  );
}
// Usage: <Button href="/enquiry">Order Enquiry</Button> or <Button>Submit</Button> 