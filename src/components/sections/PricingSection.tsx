"use client";

import { useState } from "react";
import Image from "next/image";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import ZipCheckModal from "@/components/forms/ZipCheckModal";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { CheckCircle } from "lucide-react";

const pricingFeatures = [
  "Your access remains exclusive for as long as you\u2019re active.",
  "If you cancel, the ZIP becomes available again.",
  "Onboarding begins immediately.",
  "Your brand typically goes live within one week.",
];

export default function PricingSection() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section id="pricing" className="bg-white">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-10 md:px-16 lg:px-20 py-16 md:py-20">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-12">
            {/* Left Image */}
            <AnimatedSection direction="left" className="w-full lg:w-[628px] shrink-0">
              <div className="relative aspect-[628/620] w-full overflow-hidden">
                <Image
                  src="/images/section-4.jpg"
                  alt="Secure territory"
                  fill
                  className="object-cover"
                />
                {/* Pricing Card */}
                <div className="absolute bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 w-[90%] max-w-[532px] bg-white p-6 shadow-xl text-center">
                  <div className="flex flex-col items-center gap-2 mb-4">
                    <span className="text-sm font-bold text-[#99a1af] tracking-[-0.15px]">
                      STARTING
                    </span>
                    <div className="flex items-end gap-1">
                      <span className="text-[48px] font-black text-[#2a2d7c] leading-[48px] tracking-[-2px]">
                        $199
                      </span>
                      <span className="text-sm font-bold text-[#99a1af] tracking-[-0.15px]">
                        /MO
                      </span>
                    </div>
                    <span className="text-sm font-bold text-[#4a5565] uppercase tracking-[1.2px]">
                      per zip code
                    </span>
                  </div>
                  <p className="text-[#6a7282] text-base italic font-medium tracking-[-0.31px]">
                    Locked-in pricing for the duration of your active status.
                  </p>
                </div>
              </div>
            </AnimatedSection>

            {/* Right Content */}
            <AnimatedSection direction="right" delay={150} className="flex-1 w-full lg:pl-[72px]">
              <div className="flex flex-col gap-6 mb-10">
                <Badge>Investment Structure</Badge>
                <h2 className="font-bold text-[#2a2d7c] tracking-[-1.5px]">
                  PRICING
                </h2>
                <p className="text-[#6a7282] text-lg leading-[26px]">
                  Secure your territory today. Your access remains exclusive for
                  as long as you&apos;re active.
                </p>
              </div>

              {/* Feature Checklist */}
              <div className="flex flex-col gap-4 mb-10">
                {pricingFeatures.map((feature, i) => (
                  <AnimatedSection key={feature} delay={200 + i * 100} direction="up" className="flex items-center gap-4">
                    <div className="size-6 rounded-full bg-[#2a2d7c] flex items-center justify-center shrink-0">
                      <CheckCircle className="size-3.5 text-white" />
                    </div>
                    <span className="text-[#6a7282] text-lg font-medium tracking-[-0.44px]">
                      {feature}
                    </span>
                  </AnimatedSection>
                ))}
              </div>

              {/* CTA Button - Opens Modal */}
              <Button
                onClick={() => setModalOpen(true)}
                variant="primary"
                fullWidth
              >
                CHECK ZIP AVAILABILITY
              </Button>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <ZipCheckModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
