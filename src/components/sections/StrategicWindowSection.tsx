"use client";

import Image from "next/image";
import Badge from "@/components/ui/Badge";
import IconBox from "@/components/ui/IconBox";
import AnimatedSection from "@/components/ui/AnimatedSection";
import ProgressBar from "@/components/ui/ProgressBar";
import { ScanFace, Activity, TrendingUp } from "lucide-react";

const features = [
  {
    icon: ScanFace,
    title: "Identification",
    description:
      "Viu identifies homeowners likely to sell during that critical window using predictive behavior analytics.",
  },
  {
    icon: Activity,
    title: "Consistent Presence",
    description:
      "Your brand appears daily on the platforms they trust, building familiarity long before search begins.",
  },
  {
    icon: TrendingUp,
    title: "Market Advantage",
    description:
      "When they finally decide to reach out, your name isn\u2019t new \u2014 it\u2019s already the market authority.",
  },
];

export default function StrategicWindowSection() {
  return (
    <section id="advantage" className="bg-white">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-10 md:px-16 lg:px-20 py-12 md:py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-10 lg:gap-12">
          {/* Left Content */}
          <AnimatedSection direction="left" className="flex-1 w-full lg:pr-6">
            <div className="flex flex-col gap-4 md:gap-6 mb-8 md:mb-10">
              <Badge>THE 90-DAY STRATEGIC WINDOW</Badge>
              <h2 className="font-bold text-[#2a2d7c] tracking-[-1.5px]">
                BE FIRST.
                <br />
                <span className="text-[#f57f20]">BE KNOWN.</span>
              </h2>
              <p className="text-[#6a7282] text-base md:text-lg leading-6">
                Homeowners don&apos;t decide to sell overnight. There&apos;s a
                window — often 90 days or more — where they&apos;re observing
                the market before any formal action.
              </p>
            </div>

            <div className="flex flex-col gap-5 md:gap-6">
              {features.map((f, i) => (
                <AnimatedSection key={f.title} delay={i * 120} direction="up" className="flex gap-4 md:gap-6 items-start">
                  <IconBox>
                    <f.icon className="size-6 md:size-7 text-[#f57f20]" />
                  </IconBox>
                  <div className="flex flex-col gap-2 md:gap-3">
                    <h3 className="font-bold text-[#2a2d7c] text-base md:text-lg uppercase tracking-[-0.45px]">
                      {f.title}
                    </h3>
                    <p className="text-[#6a7282] text-sm md:text-base leading-[24px] md:leading-[26px] tracking-[-0.31px]">
                      {f.description}
                    </p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </AnimatedSection>

          {/* Right Image */}
          <AnimatedSection direction="right" delay={200} className="w-full lg:w-[628px] shrink-0">
            <div className="relative aspect-[4/4] md:aspect-[628/624] w-full overflow-hidden">
              <Image
                src="/images/section-1.jpg"
                alt="Real estate market landscape"
                fill
                className="object-cover"
              />
              {/* Overlay Card */}
              <div className="absolute bottom-3 sm:bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 w-[92%] max-w-[532px] bg-white p-4 sm:p-6 shadow-xl">
                <div className="flex gap-4 sm:gap-6 items-start mb-4 sm:mb-6">
                  <IconBox className="hidden sm:flex">
                    <Activity className="size-7 text-[#f57f20]" />
                  </IconBox>
                  <div className="flex flex-col gap-1 sm:gap-2">
                    <span className="text-xs sm:text-sm font-semibold text-[#6a7282] uppercase tracking-[2.1px]">
                      Predictive Signal
                    </span>
                    <span className="text-base sm:text-xl font-bold text-[#2a2d7c] uppercase tracking-[-0.45px]">
                      90210 Market Intensity
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 sm:gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-semibold text-[#2a2d7c] uppercase tracking-[1.5px] sm:tracking-[2.1px]">
                      Early Interest
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-[#2a2d7c] uppercase tracking-[1.5px] sm:tracking-[2.1px]">
                      42%
                    </span>
                  </div>
                  <ProgressBar percentage={42} />
                  <p className="text-[#6a7282] text-sm sm:text-base tracking-[-0.31px] leading-5 sm:leading-6">
                    &ldquo;Capturing attention 3 months before listing behavior
                    peaks.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
