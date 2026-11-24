"use client";

import React from "react";
import Image from "next/image";

export default function FloatingButtons() {
  return (
    <>
      {/* Left Bottom Floating WhatsApp Button */}
      <a
        href="https://wa.me/919888881908"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed left-4 sm:left-6 bottom-6 sm:bottom-8 z-50 group flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-[#25D366] rounded-full shadow-[0_8px_25px_rgba(37,211,102,0.4)] hover:scale-110 active:scale-95 transition-all duration-300 ring-2 ring-white/70"
      >
        <div className="relative w-6 h-6 sm:w-8 sm:h-8">
          <Image
            src="/assets/whatsapp.png"
            alt="WhatsApp"
            fill
            className="object-contain"
          />
        </div>
        {/* Subtle Ping Animation */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/30 animate-ping -z-10" />
      </a>

      {/* Right Bottom Floating Golden Phone Button */}
      <a
        href="tel:+919888881908"
        aria-label="Call Customer Care"
        className="fixed right-4 sm:right-6 bottom-6 sm:bottom-8 z-50 group flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-[#DCA52D] hover:bg-[#B8861B] rounded-full shadow-[0_8px_25px_rgba(220,165,45,0.45)] hover:scale-110 active:scale-95 transition-all duration-300 ring-2 ring-white/70"
      >
        <div className="relative w-6 h-6 sm:w-7 sm:h-7">
          <Image
            src="/assets/icons8-phone-100.png"
            alt="Call Us"
            fill
            className="object-contain brightness-0 invert"
          />
        </div>
        {/* Subtle Gold Ping Animation */}
        <span className="absolute -inset-1 rounded-full bg-[#DCA52D]/30 animate-ping -z-10" />
      </a>
    </>
  );
}
