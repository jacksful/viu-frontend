"use client";

import AnimatedSection from "@/components/ui/AnimatedSection";
import Badge from "@/components/ui/Badge";
import IconBox from "@/components/ui/IconBox";
import ProgressBar from "@/components/ui/ProgressBar";
import type { CmsStrategicWindowSection as CmsStrategic } from "@/lib/cms";
import { Activity, ScanFace, TrendingUp } from "lucide-react";
import Image from "next/image";

const iconFallback = [ScanFace, Activity, TrendingUp];

function StrategicCardIcon({ url }: { url: string | null }) {
  const Icon = Activity;
  if (!url) return <Icon className="size-7 text-[#f57f20]" />;
  return (
    <div className="relative size-7">
      <Image src={url} alt="" fill className="object-contain" sizes="28px" />
    </div>
  );
}

function FeatureIcon({ url, index }: { url: string | null; index: number }) {
  const Fallback = iconFallback[index % iconFallback.length] ?? ScanFace;
  if (!url) {
    return <Fallback className="size-6 md:size-7 text-[#f57f20]" />;
  }
  return (
    <div className="relative size-6 md:size-7">
      <Image src={url} alt="" fill className="object-contain" sizes="28px" />
    </div>
  );
}

export default function StrategicWindowSection({
  data,
}: {
  data: CmsStrategic;
}) {
  console.log(data);
  const bg =
    data.visual_image_url && data.visual_image_url.length > 0
      ? data.visual_image_url
      : "/images/section-1.jpg";

  return (
    <section id="advantage" className="bg-white">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-10 md:px-16 lg:px-20 py-12 md:py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-10 lg:gap-12">
          {/* Left Content */}
          <AnimatedSection direction="left" className="flex-1 w-full lg:pr-6">
            <div className="flex flex-col gap-4 md:gap-6 mb-8 md:mb-10">
              <Badge>{data.badge_text}</Badge>
              <h2 className="font-bold text-[#2a2d7c] tracking-[-1.5px]">
                {data.headline_primary}
                <br />
                <span className="text-[#f57f20]">{data.headline_accent}</span>
              </h2>
              <p className="text-[#6a7282] text-base md:text-lg leading-6">
                {data.intro}
              </p>
            </div>

            <div className="flex flex-col gap-5 md:gap-6">
              {data.features.map((f, i) => (
                <AnimatedSection
                  key={`${f.title}-${i}`}
                  delay={i * 120}
                  direction="up"
                  className="flex gap-4 md:gap-6 items-start"
                >
                  <IconBox>
                    <FeatureIcon url={f.icon_url} index={i} />
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
          <AnimatedSection
            direction="right"
            delay={200}
            className="w-full lg:w-[628px] shrink-0"
          >
            <div className="relative aspect-[4/4] md:aspect-[628/624] w-full overflow-hidden">
              <Image
                src={bg}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 628px"
              />
              {/* Overlay Card */}
              <div className="absolute bottom-3 sm:bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 w-[92%] max-w-[532px] bg-white p-4 sm:p-6 shadow-xl">
                <div className="flex gap-4 sm:gap-6 items-start mb-4 sm:mb-6">
                  <IconBox className="hidden sm:flex">
                    <StrategicCardIcon url={data.card_icon_url} />
                  </IconBox>
                  <div className="flex flex-col gap-1 sm:gap-2">
                    <span className="text-xs sm:text-sm font-semibold text-[#6a7282] uppercase tracking-[2.1px]">
                      {data.card_kicker}
                    </span>
                    <span className="text-base sm:text-xl font-bold text-[#2a2d7c] uppercase tracking-[-0.45px]">
                      {data.card_title}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 sm:gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-semibold text-[#2a2d7c] uppercase tracking-[1.5px] sm:tracking-[2.1px]">
                      {data.card_metric_label}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-[#2a2d7c] uppercase tracking-[1.5px] sm:tracking-[2.1px]">
                      {data.card_metric_percent}%
                    </span>
                  </div>
                  <ProgressBar percentage={data.card_metric_percent} />
                  <p className="text-[#6a7282] text-sm sm:text-base tracking-[-0.31px] leading-5 sm:leading-6">
                    &ldquo;{data.card_quote}&rdquo;
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
