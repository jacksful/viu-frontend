import { ReactNode } from "react";

interface IconBoxProps {
  children: ReactNode;
  size?: "sm" | "md" | "lg";
  variant?: "orange" | "warm" | "primary" | "subtle";
  className?: string;
}

export default function IconBox({
  children,
  size = "md",
  variant = "orange",
  className = "",
}: IconBoxProps) {
  const sizes = {
    sm: "size-6",
    md: "size-14",
    lg: "size-16",
  };

  const variants = {
    orange: "bg-[rgba(245,127,32,0.1)]",
    warm: "bg-[#f9eee5]",
    primary: "bg-[#2a2d7c]",
    subtle: "bg-[rgba(42,45,124,0.05)]",
  };

  return (
    <div
      className={`flex items-center justify-center rounded-full shrink-0 ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {children}
    </div>
  );
}
