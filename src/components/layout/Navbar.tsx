"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";

const navLinks = [
  { label: "The Advantage", href: "#advantage" },
  { label: "Territory", href: "#territory" },
  { label: "Exclusivity", href: "#exclusivity" },
  { label: "Pricing", href: "#pricing" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#121212]/80 backdrop-blur-md shadow-lg"
          : "bg-[#121212]/20 backdrop-blur-[3px]"
      }`}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 sm:px-10 md:px-16 lg:px-20 py-4 md:py-[18px]">
        {/* Logo */}
        <a href="/" className="shrink-0 block">
          <Image
            src="/images/logo-white.svg"
            alt="VIU"
            width={120}
            height={44}
            className="h-[36px] md:h-[44px] w-auto object-contain"
            priority
          />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-white text-base font-medium tracking-[-0.325px] hover:text-[#f57f20] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <Button variant="primary" size="sm" href="#pricing">
            Check Territory
          </Button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
          aria-label="Toggle menu"
        >
          <span
            className={`block h-0.5 w-6 bg-white transition-transform duration-300 ${
              isOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-opacity duration-300 ${
              isOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-transform duration-300 ${
              isOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-4 px-5 sm:px-10 pb-6 bg-[#121212]/90 backdrop-blur-md">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-white text-base font-medium py-2 hover:text-[#f57f20] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <Button
            variant="primary"
            size="sm"
            fullWidth
            href="#pricing"
            onClick={() => setIsOpen(false)}
          >
            Check Territory
          </Button>
        </nav>
      </div>
    </header>
  );
}
