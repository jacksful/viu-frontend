"use client";

import { useState } from "react";
import Badge from "@/components/ui/Badge";
import IconBox from "@/components/ui/IconBox";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { Mail, ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How early does Viu reach homeowners?",
    answer:
      "Everything you need to know about territory ownership, market timing, and our structural control model.",
  },
  {
    question: "How often does my brand appear?",
    answer:
      "Your brand appears daily across the platforms that homeowners in your ZIP code visit most. This consistent presence builds familiarity and trust over time.",
  },
  {
    question: "How many agents can use the same ZIP?",
    answer:
      "Only one agent per ZIP code. This exclusivity ensures you are the only agent building brand presence in your territory.",
  },
  {
    question: "What happens if I cancel?",
    answer:
      "If you cancel, your ZIP code becomes available for another agent to claim. There are no long-term contracts or cancellation fees.",
  },
];

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
        onClick={onToggle}
        className="flex items-center justify-between w-full px-5 sm:px-6 md:px-8 py-6 sm:py-8 text-left cursor-pointer group-hover:bg-[#f9fafb] transition-colors duration-200"
      >
        <span className="font-bold text-[#2a2d7c] text-base sm:text-lg uppercase tracking-[-0.44px] pr-4">
          {question}
        </span>
        <div className={`rounded-full size-8 flex items-center justify-center shrink-0 transition-all duration-400 ${isOpen ? "bg-[#2a2d7c]" : "bg-[#f3f4f6]"}`}>
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
          <p className={`px-5 sm:px-6 md:px-8 pb-6 sm:pb-8 text-[#6a7282] text-sm sm:text-base leading-[26px] tracking-[-0.31px] transition-opacity duration-400 ${isOpen ? "opacity-100" : "opacity-0"}`}>
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="bg-[#f9fafb]">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-10 md:px-16 lg:px-20 py-16 md:py-20">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">
          {/* Left Content */}
          <AnimatedSection direction="left" className="flex-1 flex flex-col justify-center gap-8 lg:pr-6">
            <div className="flex flex-col gap-6">
              <Badge>Information Center</Badge>
              <h2 className="font-bold text-[#2a2d7c] tracking-[-1.5px]">
                COMMON INQUIRIES
              </h2>
              <p className="text-[#6a7282] text-lg leading-[26px]">
                Everything you need to know about territory ownership and our
                predictive visibility network.
              </p>
            </div>

            {/* Email Support */}
            <div className="flex items-center gap-3 pl-4 h-[74px]">
              <IconBox variant="subtle" size="md">
                <Mail className="size-5 text-[#2a2d7c]" />
              </IconBox>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#99a1af] uppercase tracking-[0.6px]">
                  Email Support
                </span>
                <a
                  href="mailto:support@fullviu.com"
                  className="text-[#2a2d7c] text-base font-bold tracking-[-0.31px] hover:text-[#f57f20] transition-colors"
                >
                  support@fullviu.com
                </a>
              </div>
            </div>
          </AnimatedSection>

          {/* Right FAQ Accordion */}
          <AnimatedSection direction="right" delay={150} className="flex-1 lg:pl-6">
            {faqs.map((faq, i) => (
              <FaqItem
                key={faq.question}
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
