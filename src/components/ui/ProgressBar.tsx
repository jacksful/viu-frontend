"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface ProgressBarProps {
  percentage: number;
  className?: string;
}

export default function ProgressBar({ percentage, className = "" }: ProgressBarProps) {
  const { ref, isVisible } = useScrollAnimation(0.3);

  return (
    <div
      ref={ref}
      className={`h-3 sm:h-[18px] w-full rounded-full bg-[#ebebeb] overflow-hidden ${className}`}
    >
      <div
        className="h-full rounded-full bg-[#f57f20] transition-all ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          width: isVisible ? `${percentage}%` : "0%",
          transitionDuration: "1400ms",
          transitionDelay: "300ms",
        }}
      />
    </div>
  );
}
