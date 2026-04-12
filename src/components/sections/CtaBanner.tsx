"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import ContactForm from "@/components/forms/ContactForm";

export default function CtaBanner() {
  const [showForm, setShowForm] = useState(false);

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-10 md:px-16 lg:px-20 py-16 md:py-20">
        <div className="bg-[#2a2d7c] p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
            <div className="flex-1">
              <h2 className="font-bold text-white text-[clamp(1.75rem,3.5vw,3rem)] leading-[56px] tracking-[-1.5px] mb-4">
                STILL HAVE QUESTIONS?
              </h2>
              <p className="text-[#868c96] text-lg leading-6">
                Our territory specialists are available to help you secure your
                market.
              </p>
            </div>
            {!showForm && (
              <Button
                variant="primary"
                onClick={() => setShowForm(true)}
              >
                Contact Specialist
              </Button>
            )}
          </div>

          {/* Contact Form (expandable) */}
          <div
            className={`overflow-hidden transition-all duration-500 ${
              showForm ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="pt-8 border-t border-white/10">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
