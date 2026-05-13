"use client";

import Image from "next/image";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import AnimatedSection from "@/components/ui/AnimatedSection";
import type { CmsPricingSection as CmsPricing } from "@/lib/cms";
import { CheckCircle } from "lucide-react";

export default function PricingSection({ data }: { data: CmsPricing }) {
  const leftBg =
    data.left_image_url && data.left_image_url.length > 0
      ? data.left_image_url
      : "/images/section-4.jpg";

  return (
    <section id="pricing" className="bg-white">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-10 md:px-16 lg:px-20 py-16 md:py-20">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-12">
          <AnimatedSection direction="left" className="w-full lg:w-[628px] shrink-0">
            <div className="relative aspect-[628/620] w-full overflow-hidden">
              <Image
                src={leftBg}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 628px"
              />
              <div className="absolute bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 w-[90%] max-w-[532px] bg-white p-6 shadow-xl text-center">
                <div className="flex flex-col items-center gap-2 mb-4">
                  <span className="text-sm font-bold text-[#99a1af] tracking-[-0.15px] uppercase">
                    {data.card_label_starting}
                  </span>
                  <div className="flex items-end gap-1">
                    <span className="text-[48px] font-black text-[#2a2d7c] leading-[48px] tracking-[-2px]">
                      {data.card_price_display}
                    </span>
                    <span className="text-sm font-bold text-[#99a1af] tracking-[-0.15px] uppercase">
                      {data.card_price_period}
                    </span>
                  </div>
                  <span className="text-sm font-bold text-[#4a5565] uppercase tracking-[1.2px]">
                    {data.card_per_label}
                  </span>
                </div>
                <p className="text-[#6a7282] text-base italic font-medium tracking-[-0.31px]">
                  {data.card_footer_note}
                </p>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="right" delay={150} className="flex-1 w-full lg:pl-[72px]">
            <div className="flex flex-col gap-6 mb-10">
              <Badge>{data.badge_text}</Badge>
              <h2 className="font-bold text-[#2a2d7c] tracking-[-1.5px]">{data.heading}</h2>
              <p className="text-[#6a7282] text-lg leading-[26px]">{data.intro}</p>
            </div>

            <div className="flex flex-col gap-4 mb-10">
              {data.feature_lines.map((feature, i) => (
                <AnimatedSection key={`${feature.text}-${i}`} delay={200 + i * 100} direction="up" className="flex items-center gap-4">
                  <div className="size-6 rounded-full bg-[#2a2d7c] flex items-center justify-center shrink-0">
                    <CheckCircle className="size-3.5 text-white" />
                  </div>
                  <span className="text-[#6a7282] text-lg font-medium tracking-[-0.44px]">
                    {feature.text}
                  </span>
                </AnimatedSection>
              ))}
            </div>

            <Button variant="primary" fullWidth href={data.cta_href}>
              {data.cta_label}
            </Button>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
