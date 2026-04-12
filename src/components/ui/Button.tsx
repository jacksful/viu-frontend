"use client";

import { ReactNode, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  href?: string;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  href,
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "relative inline-flex items-center justify-center font-semibold uppercase transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer overflow-hidden group";

  const variants = {
    primary:
      "bg-[#f57f20] text-[#121212] shadow-[0px_20px_25px_0px_rgba(0,0,0,0.05),0px_8px_10px_0px_rgba(0,0,0,0.05)] hover:bg-[#e06d10] hover:shadow-[0px_24px_30px_0px_rgba(245,127,32,0.25)] hover:-translate-y-[1px] active:translate-y-0 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none",
    outline:
      "border border-white/20 bg-white/10 text-white hover:bg-white/20 hover:border-white/30",
    ghost: "text-[#2a2d7c] hover:bg-[rgba(245,127,32,0.1)]",
  };

  const sizes = {
    sm: "px-4 py-3 text-sm leading-5",
    md: "px-6 py-3 text-base leading-6",
    lg: "px-8 py-4 text-lg leading-6",
  };

  const classes = `${base} ${variants[variant]} ${sizes[size]} ${fullWidth ? "w-full" : ""} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
