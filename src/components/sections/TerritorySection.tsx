"use client";

import Image from "next/image";
import Badge from "@/components/ui/Badge";
import IconBox from "@/components/ui/IconBox";
import AnimatedSection from "@/components/ui/AnimatedSection";
import type { CmsTerritoryZipSection as CmsTerritory } from "@/lib/cms";
import { CheckSquare, Layers, Link2, Share2, Target } from "lucide-react";

const columnIconFallback = [Share2, Layers, Link2];

export default function TerritorySection({ data }: { data: CmsTerritory }) {
  const leftBg =
    data.left_visual_image_url && data.left_visual_image_url.length > 0
      ? data.left_visual_image_url
      : "/images/section-2.jpg";

  return (
    <section id="territory" className="bg-[#f8fafc]">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-10 md:px-16 lg:px-20 py-12 md:py-16 lg:py-20">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-8 md:gap-10 lg:gap-12">
          <AnimatedSection direction="left" className="w-full lg:w-[628px] shrink-0">
            <div className="relative w-full overflow-hidden" style={{ aspectRatio: "628 / 680" }}>
              <Image
                src={leftBg}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 628px"
              />
              <div className="absolute bottom-4 sm:bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 w-[88%] max-w-[532px] bg-white p-4 sm:p-6 shadow-xl">
                <div className="flex gap-4 sm:gap-6 items-center mb-4 sm:mb-6">
                  <IconBox>
                    {data.left_card_icon_url ? (
                      <div className="relative size-7">
                        <Image
                          src={data.left_card_icon_url}
                          alt=""
                          fill
                          className="object-contain"
                          sizes="28px"
                        />
                      </div>
                    ) : (
                      <Target className="size-7 text-[#f57f20]" />
                    )}
                  </IconBox>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs sm:text-sm font-semibold text-[#6a7282] uppercase tracking-[2.1px]">
                      {data.card_kicker}
                    </span>
                    <span className="text-base sm:text-xl font-bold text-[#2a2d7c] uppercase tracking-[-0.45px]">
                      {data.card_title}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 sm:gap-3">
                  {data.checklist_items.map((item, idx) => (
                    <div
                      key={`${idx}-${item.text}`}
                      className="flex items-center gap-3 bg-[#f9fafb] px-3 sm:px-6 py-2.5 sm:py-3"
                    >
                      {data.checklist_check_icon_url ? (
                        <div className="relative size-5 sm:size-6 shrink-0">
                          <Image
                            src={data.checklist_check_icon_url}
                            alt=""
                            fill
                            className="object-contain"
                          />
                        </div>
                      ) : (
                        <div className="size-5 sm:size-6 rounded bg-[#2a2d7c] flex items-center justify-center shrink-0">
                          <CheckSquare className="size-3.5 sm:size-4 text-white" />
                        </div>
                      )}
                      <span className="text-[#6a7282] text-sm sm:text-base font-semibold capitalize tracking-[-0.45px]">
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="right" delay={150} className="flex-1 w-full lg:pl-[72px]">
            <div className="flex flex-col gap-6 mb-10">
              <Badge>{data.badge_text}</Badge>
              <h2 className="font-bold text-[#2a2d7c] tracking-[-1.5px]">
                {data.headline_primary}
                <br />
                <span className="text-[#f57f20]">{data.headline_accent}</span>
              </h2>
              <p className="text-[#6a7282] text-lg leading-[26px]">{data.intro}</p>
            </div>

            <div className="flex gap-6 mb-6">
              {data.feature_columns.map((col, i) => (
                <AnimatedSection
                  key={`${col.label}-${i}`}
                  delay={200 + i * 100}
                  direction="up"
                  className="flex-1"
                >
                  <div className="flex flex-col items-center text-center gap-5 py-6">
                    <IconBox variant="warm" size="md">
                      {col.icon_url ? (
                        <div className="relative size-7">
                          <Image
                            src={col.icon_url}
                            alt=""
                            fill
                            className="object-contain"
                            sizes="28px"
                          />
                        </div>
                      ) : (
                        (() => {
                          const Fallback =
                            columnIconFallback[i % columnIconFallback.length] ?? Share2;
                          return (
                            <Fallback className="size-7 text-[#f57f20]" strokeWidth={1.5} />
                          );
                        })()
                      )}
                    </IconBox>
                    <h3 className="font-bold text-[#2a2d7c] text-base lg:text-lg uppercase tracking-[-0.45px]">
                      {col.label}
                    </h3>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            <AnimatedSection delay={500} direction="up">
              <div className="bg-white p-6">
                <div className="flex gap-6 items-center">
                  <IconBox>
                    {data.quote_icon_url ? (
                      <div className="relative size-7">
                        <Image
                          src={data.quote_icon_url}
                          alt=""
                          fill
                          className="object-contain"
                          sizes="28px"
                        />
                      </div>
                    ) : (
                      <Target className="size-7 text-[#f57f20]" />
                    )}
                  </IconBox>
                  <p className="font-bold text-[#6a7282] text-base lg:text-lg uppercase tracking-[-0.45px]">
                    {data.quote_text}
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
