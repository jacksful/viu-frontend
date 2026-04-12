"use client";

import ZipCheckModal from "@/components/forms/ZipCheckModal";
import Button from "@/components/ui/Button";
import {
  checkZipAvailability,
  type ZipAvailabilityResponse,
} from "@/lib/zipAvailability";
import { CheckCircle, Loader2, Shield } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const [zipCode, setZipCode] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [heroSubmitLoading, setHeroSubmitLoading] = useState(false);
  const [heroSubmitError, setHeroSubmitError] = useState("");
  const [prefetchedAvailability, setPrefetchedAvailability] =
    useState<ZipAvailabilityResponse | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setHeroSubmitError("");

    // if (zipCode.length !== 5) {
    //   setHeroSubmitError("Please enter a 5-digit ZIP code.");
    //   return;
    // }

    setHeroSubmitLoading(true);
    try {
      const result = await checkZipAvailability(zipCode);
      setPrefetchedAvailability(result);
      setModalOpen(true);
    } catch (err) {
      setHeroSubmitError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setHeroSubmitLoading(false);
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setPrefetchedAvailability(null);
  };

  return (
    <>
      <section className="relative min-h-[100svh] md:min-h-[708px] flex items-center overflow-hidden">
        {/* Parallax Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0 will-change-transform"
            style={{ transform: `translateY(${scrollY * 0.3}px) scale(1.1)` }}
          >
            <Image
              src="/images/hero-bg.jpg"
              alt=""
              fill
              className="object-cover"
              priority
              quality={90}
            />
          </div>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(225deg, rgba(42,45,124,0) 34%, rgb(42,45,124) 100%)",
            }}
          />
        </div>

        {/* Content with fade-in */}
        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 sm:px-10 md:px-16 lg:px-20 pt-28 md:pt-32 pb-16 md:pb-20">
          <div className="max-w-[630px]">
            {/* Headline — staggered character reveal */}
            <h1
              className={`font-black text-white tracking-[-4.2px] leading-[1.1] mb-8 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <span className="block">OWN THE MARKET</span>
              <span className="block">BEFORE THEY SELL</span>
            </h1>

            <p
              className={`text-white text-lg leading-6 mb-8 max-w-[580px] transition-all duration-1000 delay-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              Viu uses predictive modeling to place your brand in front of
              homeowners up to 90 days before they decide to sell — securing
              your position before search even begins.
            </p>

            {/* ZIP Code Form */}
            <form
              onSubmit={handleSubmit}
              className={`flex flex-col gap-6 transition-all duration-1000 delay-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              <div className="flex flex-col sm:flex-row gap-3">
                <div
                  className="flex items-center gap-2 bg-white/10 border border-white/20 px-3 py-3 w-full sm:w-[380px] transition-colors focus-within:border-white/40 focus-within:bg-white/15"
                  suppressHydrationWarning
                >
                  <Shield className="size-5 text-white/70 shrink-0" />
                  <input
                    type="text"
                    inputMode="numeric"
                    value={zipCode}
                    onChange={(e) => {
                      setZipCode(e.target.value.replace(/\D/g, "").slice(0, 5));
                      setHeroSubmitError("");
                    }}
                    placeholder="Enter ZIP Code"
                    className="bg-transparent text-white placeholder:text-[#d1d5dc] text-base w-full outline-none tracking-[-0.3px]"
                    maxLength={5}
                  />
                </div>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={heroSubmitLoading}
                >
                  {heroSubmitLoading ? (
                    <Loader2 className="size-5 animate-spin" />
                  ) : (
                    "SECURE TERRITORY"
                  )}
                </Button>
              </div>

              {heroSubmitError && (
                <p className="text-red-300 text-sm -mt-2">{heroSubmitError}</p>
              )}

              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {["1 Agent Per ZIP", "98% Retention", "Exclusive Access"].map(
                  (text, i) => (
                    <div
                      key={text}
                      className={`flex items-center gap-1.5 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        mounted
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-3"
                      }`}
                      style={{ transitionDelay: `${600 + i * 100}ms` }}
                    >
                      <CheckCircle className="size-3.5 text-white" />
                      <span className="text-white text-xs font-medium uppercase tracking-[2.1px]">
                        {text}
                      </span>
                    </div>
                  ),
                )}
              </div>
            </form>
          </div>
        </div>
      </section>

      <ZipCheckModal
        isOpen={modalOpen}
        onClose={handleModalClose}
        initialZip={zipCode}
        skipSearch
        prefetchedAvailability={prefetchedAvailability}
      />
    </>
  );
}
