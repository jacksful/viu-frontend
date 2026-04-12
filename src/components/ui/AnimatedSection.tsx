"use client";

import { ReactNode } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "fade" | "scale" | "blur";
  duration?: number;
}

export default function AnimatedSection({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 900,
}: AnimatedSectionProps) {
  const { ref, isVisible } = useScrollAnimation(0.08);

  const initial: Record<string, string> = {
    up: "translate-y-12 opacity-0",
    left: "-translate-x-12 opacity-0",
    right: "translate-x-12 opacity-0",
    fade: "opacity-0",
    scale: "scale-90 opacity-0",
    blur: "opacity-0 blur-[6px]",
  };

  const visible =
    "translate-x-0 translate-y-0 scale-100 opacity-100 blur-0";

  return (
    <div
      ref={ref}
      className={`transition-all ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isVisible ? visible : initial[direction]
      } ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
