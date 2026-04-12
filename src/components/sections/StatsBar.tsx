"use client";

import { useCountUp } from "@/hooks/useCountUp";

const stats = [
  { value: "90", label: "Pre-Market Advantage" },
  { value: "100%", label: "Exclusive Rights" },
  { value: "24/7", label: "Monitoring" },
];

function StatItem({ value, label, delay }: { value: string; label: string; delay: number }) {
  const { ref, display, isVisible } = useCountUp(value, 1800);

  return (
    <div
      ref={ref}
      className={`flex flex-col gap-2 items-center text-center text-white w-full transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <span className="text-[32px] font-black leading-10 tracking-[-1.5px]">
        {display}
      </span>
      <span className="text-xs font-medium uppercase tracking-[2.1px] leading-5">
        {label}
      </span>
    </div>
  );
}

export default function StatsBar() {
  return (
    <section className="bg-[#2a2d7c]">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-10 md:px-16 lg:px-20 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-0">
          {stats.map((stat, i) => (
            <div key={stat.label} className="flex items-center w-full sm:flex-1">
              {i > 0 && (
                <div className="hidden sm:block w-px h-[68px] bg-white/20 shrink-0" />
              )}
              <StatItem value={stat.value} label={stat.label} delay={i * 200} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
