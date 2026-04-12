"use client";

import Image from "next/image";
import Badge from "@/components/ui/Badge";
import IconBox from "@/components/ui/IconBox";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { Share2, Layers, Link2, Target, CheckSquare } from "lucide-react";

const exclusivityItems = [
  { icon: Share2, label: "No sharing" },
  { icon: Layers, label: "No overlap" },
  { icon: Link2, label: "No congestion" },
];

const checklistItems = [
  "Predictive homeowner targeting active",
  "Daily brand reinforcement running",
  "Competitor lockout engaged",
  "Market share compounding",
];

export default function TerritorySection() {
  return (
    <section id="territory" className="bg-[#f8fafc]">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-10 md:px-16 lg:px-20 py-12 md:py-16 lg:py-20">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-8 md:gap-10 lg:gap-12">
          {/* Left Image */}
          <AnimatedSection direction="left" className="w-full lg:w-[628px] shrink-0">
            <div className="relative w-full overflow-hidden" style={{ aspectRatio: "628 / 680" }}>
              <Image
                src="/images/section-2.jpg"
                alt="Territory ownership dashboard"
                fill
                className="object-cover"
              />
              {/* Overlay Card — contained within image bounds */}
              <div className="absolute bottom-4 sm:bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 w-[88%] max-w-[532px] bg-white p-4 sm:p-6 shadow-xl">
                <div className="flex gap-4 sm:gap-6 items-center mb-4 sm:mb-6">
                  <IconBox>
                    <Target className="size-7 text-[#f57f20]" />
                  </IconBox>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs sm:text-sm font-semibold text-[#6a7282] uppercase tracking-[2.1px]">
                      ZIP Territory: 90210
                    </span>
                    <span className="text-base sm:text-xl font-bold text-[#2a2d7c] uppercase tracking-[-0.45px]">
                      Market Ownership
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 sm:gap-3">
                  {checklistItems.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 bg-[#f9fafb] px-3 sm:px-6 py-2.5 sm:py-3"
                    >
                      <div className="size-5 sm:size-6 rounded bg-[#2a2d7c] flex items-center justify-center shrink-0">
                        <CheckSquare className="size-3.5 sm:size-4 text-white" />
                      </div>
                      <span className="text-[#6a7282] text-sm sm:text-base font-semibold capitalize tracking-[-0.45px]">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Right Content */}
          <AnimatedSection direction="right" delay={150} className="flex-1 w-full lg:pl-[72px]">
            <div className="flex flex-col gap-6 mb-10">
              <Badge>TERRITORY LOCK ENGAGED</Badge>
              <h2 className="font-bold text-[#2a2d7c] tracking-[-1.5px]">
                ONE ZIP.
                <br />
                <span className="text-[#f57f20]">ONE AGENT.</span>
              </h2>
              <p className="text-[#6a7282] text-lg leading-[26px]">
                Every ZIP inside Viu is assigned to a single agent at a time.
                While active, no other agent can enter that ZIP.
              </p>
            </div>

            {/* Exclusivity Icons — matching Figma: centered icon above label */}
            <div className="flex gap-6 mb-6">
              {exclusivityItems.map((item, i) => (
                <AnimatedSection key={item.label} delay={200 + i * 100} direction="up" className="flex-1">
                  <div className="flex flex-col items-center text-center gap-5 py-6">
                    <IconBox variant="warm" size="md">
                      <item.icon className="size-7 text-[#f57f20]" strokeWidth={1.5} />
                    </IconBox>
                    <h3 className="font-bold text-[#2a2d7c] text-base lg:text-lg uppercase tracking-[-0.45px]">
                      {item.label}
                    </h3>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            {/* Quote Card */}
            <AnimatedSection delay={500} direction="up">
              <div className="bg-white p-6">
                <div className="flex gap-6 items-center">
                  <IconBox>
                    <Target className="size-7 text-[#f57f20]" />
                  </IconBox>
                  <p className="font-bold text-[#6a7282] text-base lg:text-lg uppercase tracking-[-0.45px]">
                    &ldquo;When a ZIP is live, it&apos;s yours. Period.&rdquo;
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
