"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import { Loader2 } from "lucide-react";

function normalizeZip(value: string) {
  return value.replace(/\D/g, "").slice(0, 5);
}

export interface ContactFormProps {
  /** Pre-fills ZIP code of interest (e.g. from zip check modal). */
  initialZip?: string;
  /** Override default `id="contact"` to avoid duplicate IDs when embedded. */
  formId?: string;
  className?: string;
}

export default function ContactForm({
  initialZip = "",
  formId = "contact",
  className,
}: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    zip_of_interest: normalizeZip(initialZip),
    message: "",
  });

  useEffect(() => {
    if (!initialZip) return;
    const z = normalizeZip(initialZip);
    setFormData((prev) =>
      prev.zip_of_interest === z ? prev : { ...prev, zip_of_interest: z },
    );
  }, [initialZip]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    success?: boolean;
    message?: string;
    error?: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = (await res.json()) as {
        success?: boolean;
        message?: string;
        error?: string;
      };

      if (!res.ok || data.success === false) {
        setResult({
          error:
            typeof data.message === "string"
              ? data.message
              : typeof data.error === "string"
                ? data.error
                : "Request failed. Please try again.",
        });
      } else if (data.success) {
        setResult({ message: data.message });
        setFormData({
          name: "",
          email: "",
          phone: "",
          zip_of_interest: normalizeZip(initialZip),
          message: "",
        });
      } else {
        setResult({
          error:
            typeof data.message === "string"
              ? data.message
              : "Could not submit your request.",
        });
      }
    } catch {
      setResult({ error: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-col gap-4${className ? ` ${className}` : ""}`}
      id={formId}
      suppressHydrationWarning
    >
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4"
        suppressHydrationWarning
      >
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Full Name *"
          required
          className="bg-white border border-[#e5e7eb] px-4 py-3 text-base text-[#121212] placeholder:text-[#99a1af] outline-none focus:border-[#2a2d7c] transition-colors"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email Address *"
          required
          className="bg-white border border-[#e5e7eb] px-4 py-3 text-base text-[#121212] placeholder:text-[#99a1af] outline-none focus:border-[#2a2d7c] transition-colors"
        />
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="bg-white border border-[#e5e7eb] px-4 py-3 text-base text-[#121212] placeholder:text-[#99a1af] outline-none focus:border-[#2a2d7c] transition-colors"
        />
        <input
          type="text"
          name="zip_of_interest"
          value={formData.zip_of_interest}
          onChange={(e) => {
            const val = e.target.value.replace(/\D/g, "").slice(0, 5);
            setFormData({ ...formData, zip_of_interest: val });
          }}
          placeholder="ZIP Code of Interest"
          inputMode="numeric"
          maxLength={5}
          className="bg-white border border-[#e5e7eb] px-4 py-3 text-base text-[#121212] placeholder:text-[#99a1af] outline-none focus:border-[#2a2d7c] transition-colors"
        />
      </div>
      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="How can we help you?"
        rows={4}
        className="bg-white border border-[#e5e7eb] px-4 py-3 text-base text-[#121212] placeholder:text-[#99a1af] outline-none focus:border-[#2a2d7c] transition-colors resize-none"
      />

      <Button type="submit" variant="primary" fullWidth disabled={loading}>
        {loading ? <Loader2 className="size-5 animate-spin" /> : "SEND MESSAGE"}
      </Button>

      {result && (
        <div
          className={`text-sm font-medium px-4 py-3 rounded ${
            result.error
              ? "bg-red-50 text-red-600 border border-red-200"
              : "bg-green-50 text-green-600 border border-green-200"
          }`}
        >
          {result.error || result.message}
        </div>
      )}
    </form>
  );
}
