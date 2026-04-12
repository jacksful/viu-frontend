"use client";

import Image from "next/image";
import Badge from "@/components/ui/Badge";
import AnimatedSection from "@/components/ui/AnimatedSection";
import ProgressBar from "@/components/ui/ProgressBar";

export default function BrandAuthoritySection() {
  return (
    <section id="exclusivity" className="bg-[#2a2d7c]">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-10 md:px-16 lg:px-20 py-12 md:py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-10 lg:gap-12">
          {/* Left Content */}
          <AnimatedSection direction="left" className="flex-1 w-full lg:pr-[72px]">
            <div className="flex flex-col gap-4 md:gap-6 mb-8 md:mb-10">
              <Badge variant="white">Permanent Brand Authority</Badge>
              <h2 className="font-bold text-white leading-[1.15] tracking-[-1.5px]">
                BUILT FOR
                <br />
                LONG-TERM
                <br />
                RECOGNITION
              </h2>
              <p className="text-[#868c96] text-base md:text-lg leading-[26px]">
                Viu places your brand across the sites homeowners already visit,
                creating consistent visibility over time.
              </p>
            </div>

            {/* Authority Cards */}
            <div className="flex flex-col gap-4 md:gap-6">
              <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
                <div className="flex-1 bg-white/5 p-4 md:p-6">
                  <p className="text-white text-base md:text-lg font-bold capitalize tracking-[-0.45px] leading-6">
                    Some homeowners engage quickly.
                  </p>
                </div>
                <div className="flex-1 bg-white/5 p-4 md:p-6">
                  <p className="text-white text-base md:text-lg font-bold capitalize tracking-[-0.45px] leading-6">
                    Others take longer.
                  </p>
                </div>
              </div>
              <AnimatedSection delay={200} direction="up">
                <div className="bg-white/5 p-4 md:p-6 flex flex-col gap-4 md:gap-6">
                  <p className="text-white text-base md:text-lg font-bold capitalize tracking-[-0.45px] leading-6">
                    What matters is that when the moment arrives, your name
                    isn&apos;t new — it&apos;s already known.
                  </p>
                  <span className="text-[#f57f20] text-xs sm:text-sm font-semibold uppercase tracking-[2.1px]">
                    Familiarity creates trust
                  </span>
                </div>
              </AnimatedSection>
            </div>
          </AnimatedSection>

          {/* Right Image */}
          <AnimatedSection direction="right" delay={200} className="w-full lg:w-[628px] shrink-0">
            <div className="relative aspect-[4/4] md:aspect-[628/624] w-full overflow-hidden">
              <Image
                src="/images/section-3.jpg"
                alt="Brand authority visualization"
                fill
                className="object-cover"
              />
              {/* Overlay Card */}
              <div className="absolute bottom-3 sm:bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 w-[92%] max-w-[532px] bg-white p-4 sm:p-6 shadow-xl">
                <div className="flex flex-col gap-4 sm:gap-6 mb-4 sm:mb-6">
                  <div className="relative h-6 sm:h-8 w-12 sm:w-14">
                    <Image
                      src="/images/logo-dark.svg"
                      alt="VIU"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="flex flex-col gap-1 sm:gap-2">
                    <span className="text-xs sm:text-sm font-semibold text-[#6a7282] uppercase tracking-[2.1px]">
                      Market Authority
                    </span>
                    <span className="text-base sm:text-xl font-bold text-[#2a2d7c] uppercase tracking-[-0.45px]">
                      Continuous Visibility
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 sm:gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-semibold text-[#6a7282] uppercase tracking-[1.5px] sm:tracking-[2.1px]">
                      Brand Domination
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-[#6a7282] uppercase tracking-[1.5px] sm:tracking-[2.1px]">
                      Compounding
                    </span>
                  </div>
                  <ProgressBar percentage={98} />
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
