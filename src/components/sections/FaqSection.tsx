"use client";

import { useState } from "react";
import Badge from "@/components/ui/Badge";
import IconBox from "@/components/ui/IconBox";
import AnimatedSection from "@/components/ui/AnimatedSection";
import type { CmsQaSection as CmsQa } from "@/lib/cms";
import { ChevronDown, Mail } from "lucide-react";
import Image from "next/image";

function FaqItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="bg-white border-b border-[#f3f4f6] group">
      <button
        type="button"
        onClick={onToggle}
        className="flex items-center justify-between w-full px-5 sm:px-6 md:px-8 py-6 sm:py-8 text-left cursor-pointer group-hover:bg-[#f9fafb] transition-colors duration-200"
      >
        <span className="font-bold text-[#2a2d7c] text-base sm:text-lg uppercase tracking-[-0.44px] pr-4">
          {question}
        </span>
        <div
          className={`rounded-full size-8 flex items-center justify-center shrink-0 transition-all duration-400 ${isOpen ? "bg-[#2a2d7c]" : "bg-[#f3f4f6]"}`}
        >
          <ChevronDown
            className={`size-4 transition-all duration-400 ${
              isOpen ? "rotate-180 text-white" : "text-[#6a7282]"
            }`}
          />
        </div>
      </button>
      <div
        className="grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p
            className={`px-5 sm:px-6 md:px-8 pb-6 sm:pb-8 text-[#6a7282] text-sm sm:text-base leading-[26px] tracking-[-0.31px] transition-opacity duration-400 ${isOpen ? "opacity-100" : "opacity-0"}`}
          >
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FaqSection({ data }: { data: CmsQa }) {
  const [openIndex, setOpenIndex] = useState(() => {
    const i = data.faq_items.findIndex((f) => f.opened);
    return i >= 0 ? i : 0;
  });

  return (
    <section className="bg-[#f9fafb]">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-10 md:px-16 lg:px-20 py-16 md:py-20">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">
          <AnimatedSection direction="left" className="flex-1 flex flex-col justify-center gap-8 lg:pr-6">
            <div className="flex flex-col gap-6">
              <Badge>{data.badge_text}</Badge>
              <h2 className="font-bold text-[#2a2d7c] tracking-[-1.5px]">{data.heading}</h2>
              <p className="text-[#6a7282] text-lg leading-[26px]">{data.intro}</p>
            </div>

            <div className="flex items-center gap-3 pl-4 h-[74px]">
              <IconBox variant="subtle" size="md">
                {data.support_icon_url ? (
                  <div className="relative size-5">
                    <Image src={data.support_icon_url} alt="" fill className="object-contain" />
                  </div>
                ) : (
                  <Mail className="size-5 text-[#2a2d7c]" />
                )}
              </IconBox>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#99a1af] uppercase tracking-[0.6px]">
                  {data.support_label}
                </span>
                <a
                  href={`mailto:${data.support_email}`}
                  className="text-[#2a2d7c] text-base font-bold tracking-[-0.31px] hover:text-[#f57f20] transition-colors"
                >
                  {data.support_email}
                </a>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="right" delay={150} className="flex-1 lg:pl-6">
            {data.faq_items.map((faq, i) => (
              <FaqItem
                key={`${faq.question}-${i}`}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
              />
            ))}
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
