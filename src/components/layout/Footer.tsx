import Image from "next/image";
import Button from "@/components/ui/Button";
import { MapPin, Mail, Shield, Globe, MessageCircle, Users } from "lucide-react";

const socialLinks = [
  { icon: Globe, href: "#", label: "LinkedIn" },
  { icon: MessageCircle, href: "#", label: "Twitter" },
  { icon: Users, href: "#", label: "Facebook" },
];

const footerInfo = [
  { icon: MapPin, text: "Montana Markets, USA" },
  { icon: Mail, text: "support@fullviu.com" },
  { icon: Shield, text: "Secure Licensing" },
];

export default function Footer() {
  return (
    <footer className="bg-[#1a1c4f]">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-10 md:px-16 lg:px-20 pt-16 md:pt-20 pb-6">
        {/* Main Footer Content */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-[72px] items-center mb-16">
          {/* Left Column */}
          <div className="flex flex-col gap-8 lg:max-w-[584px]">
            {/* Logo */}
            <Image
              src="/images/logo-white.svg"
              alt="VIU"
              width={125}
              height={44}
              className="h-[44px] w-auto object-contain"
            />
            <p className="text-[#868c96] text-lg leading-[26px] tracking-[-0.44px]">
              Predictive brand positioning for elite real estate professionals.
              Our technology identifies intent before search patterns emerge,
              securing your territory while others are still waiting for
              listings.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="size-10 rounded-md bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <social.icon className="size-5 text-[#868c96]" />
                </a>
              ))}
            </div>
          </div>

          {/* Right Column - CTA */}
          <div className="flex-1 bg-white/5 p-8 md:p-10 w-full">
            <p className="text-white text-[clamp(1.5rem,3vw,2.5rem)] font-bold uppercase leading-[48px] tracking-[-0.45px] mb-6">
              THE BEST TIME TO BE KNOWN IS BEFORE YOU&apos;RE NEEDED
            </p>
            <Button href="#pricing" variant="primary">
              CLAIM YOUR ZIP NOW
            </Button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-6 border-t border-white/10">
          <p className="text-[#868c96] text-sm font-medium tracking-[-0.15px]">
            &copy; 2026 VIU REAL ESTATE SOLUTIONS. ALL RIGHTS RESERVED.
          </p>
          <div className="flex flex-wrap gap-4 md:gap-8">
            {footerInfo.map((info) => (
              <div
                key={info.text}
                className="flex items-center gap-2"
              >
                <info.icon className="size-4 text-[#868c96]" />
                <span className="text-[#868c96] text-sm font-medium tracking-[-0.15px]">
                  {info.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
