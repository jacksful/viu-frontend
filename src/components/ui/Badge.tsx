import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "orange" | "white";
  className?: string;
}

export default function Badge({
  children,
  variant = "orange",
  className = "",
}: BadgeProps) {
  const variants = {
    orange:
      "bg-[rgba(245,127,32,0.1)] text-[#2a2d7c]",
    white:
      "bg-white/20 text-white",
  };

  return (
    <span
      className={`inline-flex items-center w-fit rounded-full px-3 py-1 text-sm font-semibold uppercase tracking-[1.2px] leading-5 ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
