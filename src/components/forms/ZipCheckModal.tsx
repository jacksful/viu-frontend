"use client";

import Button from "@/components/ui/Button";
import {
  checkZipAvailability,
  formatMonthlyPriceMain,
  submitLead,
  type ZipAvailabilityResponse,
  type ZipCodeDetails,
} from "@/lib/zipAvailability";
import { AlertCircle, CheckCircle, Loader2, Shield, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

type ModalStep =
  | "zip-search"
  | "available"
  | "lead-form"
  | "success"
  | "unavailable";

interface ZipCheckModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialZip?: string;
  skipSearch?: boolean;
  /** When set (e.g. after Hero already called the API), the modal skips a duplicate request. */
  prefetchedAvailability?: ZipAvailabilityResponse | null;
}

export default function ZipCheckModal({
  isOpen,
  onClose,
  initialZip = "",
  skipSearch = false,
  prefetchedAvailability = null,
}: ZipCheckModalProps) {
  const [step, setStep] = useState<ModalStep>("zip-search");
  const [zipCode, setZipCode] = useState(initialZip);
  const [zipDetails, setZipDetails] = useState<ZipCodeDetails | null>(null);
  const [availabilityMessage, setAvailabilityMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  });
  const [error, setError] = useState("");
  const [successDetailMessage, setSuccessDetailMessage] = useState<
    string | null
  >(null);

  const skipSearchHandledRef = useRef(false);

  const applyAvailabilityResult = useCallback(
    (data: ZipAvailabilityResponse, fallbackCode: string) => {
      const code = data.zipcode?.code ?? fallbackCode;
      setZipCode(code);
      setZipDetails(data.zipcode);
      setAvailabilityMessage(data.message);
      setStep(data.available ? "available" : "unavailable");
    },
    [],
  );

  const handleZipCheck = useCallback(
    async (zip?: string) => {
      const code = zip ?? zipCode;
      // if (!code || !/^\d{5}$/.test(code)) {
      //   setError("Please enter a valid 5-digit ZIP code.");
      //   return;
      // }

      if (!code) {
        setError("Please enter a ZIP code.");
        return;
      }

      setLoading(true);
      setError("");

      try {
        const data = await checkZipAvailability(code);
        applyAvailabilityResult(data, code);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Network error. Please try again.",
        );
      } finally {
        setLoading(false);
      }
    },
    [zipCode, applyAvailabilityResult],
  );

  useEffect(() => {
    if (!isOpen) {
      skipSearchHandledRef.current = false;
      return;
    }
    if (!skipSearch) return;

    if (prefetchedAvailability) {
      if (!skipSearchHandledRef.current) {
        skipSearchHandledRef.current = true;
        applyAvailabilityResult(prefetchedAvailability, initialZip);
      }
      return;
    }

    if (initialZip && !skipSearchHandledRef.current) {
      skipSearchHandledRef.current = true;
      void handleZipCheck(initialZip);
    }
  }, [
    isOpen,
    initialZip,
    skipSearch,
    prefetchedAvailability,
    applyAvailabilityResult,
    handleZipCheck,
  ]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setTimeout(() => {
        setStep("zip-search");
        setZipCode(initialZip || "");
        setZipDetails(null);
        setAvailabilityMessage("");
        setFormData({ name: "", email: "", phone: "", company: "" });
        setError("");
        setSuccessDetailMessage(null);
      }, 300);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, initialZip]);

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      setError("Name and email are required.");
      return;
    }

    if (!zipDetails?.id) {
      setError("ZIP data is missing. Please check availability again.");
      return;
    }

    const initialNotes = [
      formData.company.trim()
        ? `Company / Brokerage: ${formData.company.trim()}`
        : null,
      `Territory interest for ZIP ${zipCode}.`,
    ]
      .filter(Boolean)
      .join(" ");

    setLoading(true);
    setError("");

    try {
      const data = await submitLead({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        zipcodes: [zipDetails.id],
        initial_notes: initialNotes,
      });

      setSuccessDetailMessage(data.message ?? null);
      setStep("success");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Network error. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fadeIn"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white w-full max-w-[520px] max-h-[85vh] overflow-y-auto shadow-2xl animate-slideUp">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 size-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer z-10"
        >
          <X className="size-4 text-gray-600" />
        </button>

        {/* STEP: ZIP Search */}
        {step === "zip-search" && (
          <div className="p-5 sm:p-8">
            <div className="text-center mb-6 sm:mb-8">
              <div className="size-14 sm:size-16 bg-[rgba(245,127,32,0.1)] rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="size-7 sm:size-8 text-[#f57f20]" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#2a2d7c] mb-2">
                CHECK ZIP AVAILABILITY
              </h3>
              <p className="text-[#6a7282] text-sm sm:text-base">
                Enter your desired ZIP code to check territory availability.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <input
                type="text"
                inputMode="numeric"
                value={zipCode}
                onChange={(e) => {
                  setZipCode(e.target.value.replace(/\D/g, "").slice(0, 5));
                  setError("");
                }}
                placeholder="Enter ZIP Code"
                className="w-full border border-[#e5e7eb] px-4 py-3 text-lg text-[#121212] placeholder:text-[#99a1af] outline-none focus:border-[#2a2d7c] transition-colors text-center tracking-[4px] font-bold"
                maxLength={5}
                autoFocus
              />
              <Button
                onClick={() => handleZipCheck()}
                variant="primary"
                fullWidth
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="size-5 animate-spin" />
                ) : (
                  "CHECK AVAILABILITY"
                )}
              </Button>
              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}
            </div>
          </div>
        )}

        {/* STEP: Available - Show Pricing + Lead Form */}
        {step === "available" && (
          <div>
            {/* Pricing Header */}
            <div className="bg-[#2a2d7c] px-5 sm:px-8 py-5 sm:py-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <CheckCircle className="size-5 text-green-400" />
                <span className="text-green-400 text-xs sm:text-sm font-semibold uppercase tracking-[1.2px]">
                  {availabilityMessage || `ZIP ${zipCode} is Available!`}
                </span>
              </div>
              <div className="flex items-end justify-center gap-1 mb-1">
                <span className="text-white text-[40px] sm:text-[48px] font-black leading-[1] tracking-[-2px]">
                  ${formatMonthlyPriceMain(zipDetails?.monthly_price)}
                </span>
                <span className="text-white/60 text-sm font-bold">/MO</span>
              </div>
              <span className="text-white/60 text-xs font-bold uppercase tracking-[1.2px]">
                {zipDetails?.label ?? "Per ZIP Code"}
              </span>
            </div>

            {/* Lead Form */}
            <form onSubmit={handleLeadSubmit} className="p-5 sm:p-8">
              <h3 className="text-base sm:text-lg font-bold text-[#2a2d7c] mb-1">
                SECURE YOUR TERRITORY
              </h3>
              <p className="text-[#6a7282] text-sm mb-5 sm:mb-6">
                Fill in your details and our team will set up your exclusive ZIP
                territory.
              </p>

              <div className="flex flex-col gap-3 mb-5 sm:mb-6">
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Full Name *"
                  required
                  className="border border-[#e5e7eb] px-3 py-2.5 sm:px-4 sm:py-3 text-base text-[#121212] placeholder:text-[#99a1af] outline-none focus:border-[#2a2d7c] transition-colors"
                />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="Email Address *"
                  required
                  className="border border-[#e5e7eb] px-3 py-2.5 sm:px-4 sm:py-3 text-base text-[#121212] placeholder:text-[#99a1af] outline-none focus:border-[#2a2d7c] transition-colors"
                />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="Phone Number"
                  className="border border-[#e5e7eb] px-3 py-2.5 sm:px-4 sm:py-3 text-base text-[#121212] placeholder:text-[#99a1af] outline-none focus:border-[#2a2d7c] transition-colors"
                />
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  placeholder="Company / Brokerage"
                  className="border border-[#e5e7eb] px-3 py-2.5 sm:px-4 sm:py-3 text-base text-[#121212] placeholder:text-[#99a1af] outline-none focus:border-[#2a2d7c] transition-colors"
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                fullWidth
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="size-5 animate-spin" />
                ) : (
                  "CLAIM TERRITORY"
                )}
              </Button>

              {error && (
                <p className="text-red-500 text-sm text-center mt-3">{error}</p>
              )}

              <p className="text-[#99a1af] text-xs text-center mt-4">
                Locked-in pricing for the duration of your active status. Cancel
                anytime.
              </p>
            </form>
          </div>
        )}

        {/* STEP: Success */}
        {step === "success" && (
          <div className="p-5 sm:p-8 text-center">
            <div className="size-14 sm:size-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="size-7 sm:size-8 text-green-500" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#2a2d7c] mb-2">
              TERRITORY CLAIMED!
            </h3>
            <p className="text-[#6a7282] text-base mb-2">
              ZIP code <strong>{zipCode}</strong> has been reserved for you.
            </p>
            <p className="text-[#6a7282] text-sm mb-6">
              {successDetailMessage ??
                "A territory specialist will contact you within 24 hours to complete your onboarding."}
            </p>
            <Button onClick={onClose} variant="primary" fullWidth>
              DONE
            </Button>
          </div>
        )}

        {/* STEP: Unavailable */}
        {step === "unavailable" && (
          <div className="p-5 sm:p-8 text-center">
            <div className="size-14 sm:size-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="size-7 sm:size-8 text-amber-500" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#2a2d7c] mb-2">
              ZIP TAKEN
            </h3>
            <p className="text-[#6a7282] text-sm sm:text-base mb-6">
              {availabilityMessage ||
                `ZIP code ${zipCode} is currently owned by another agent. Try a different ZIP code.`}
            </p>
            <Button
              onClick={() => {
                setStep("zip-search");
                setZipCode("");
              }}
              variant="primary"
              fullWidth
            >
              TRY ANOTHER ZIP
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
