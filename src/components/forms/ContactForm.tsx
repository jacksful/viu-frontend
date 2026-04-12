"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { Loader2 } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    zipCode: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    success?: boolean;
    message?: string;
    error?: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
      const data = await res.json();

      if (!res.ok) {
        setResult({ error: data.error });
      } else {
        setResult(data);
        if (data.success) {
          setFormData({ name: "", email: "", phone: "", zipCode: "", message: "" });
        }
      }
    } catch {
      setResult({ error: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" id="contact" suppressHydrationWarning>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4" suppressHydrationWarning>
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
          name="zipCode"
          value={formData.zipCode}
          onChange={(e) => {
            const val = e.target.value.replace(/\D/g, "").slice(0, 5);
            setFormData({ ...formData, zipCode: val });
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
        {loading ? (
          <Loader2 className="size-5 animate-spin" />
        ) : (
          "SEND MESSAGE"
        )}
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
