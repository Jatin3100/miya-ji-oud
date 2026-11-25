"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import {
  MapPin,
  Phone,
  Clock,
  Navigation,
  Play,
  X,
  Crown,
  Sparkles,
  Coffee,
  MessageCircle,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

interface Boutique {
  id: string;
  name: string;
  region: "all" | "uae" | "india" | "uk";
  city: string;
  country: string;
  address: string;
  phone: string;
  hours: string;
  image: string;
  badge: string;
  mapQuery: string;
  services: string[];
}

export default function StoresPage() {
  const [activeRegion, setActiveRegion] = useState<"all" | "uae" | "india" | "uk">("all");
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  const boutiques: Boutique[] = [
    {
      id: "dubai-flagship",
      name: "Miya Ji Oud Royal Salon",
      region: "uae",
      city: "Downtown Dubai",
      country: "United Arab Emirates",
      address: "Fashion Avenue, Downtown Dubai, Near Burj Khalifa, Dubai UAE",
      phone: "+971 4 388 9000",
      hours: "Monday – Sunday: 10:00 AM – 11:00 PM GST",
      image: "/assets/Final-Store-Image-2-scaled.jpg",
      badge: "Global Flagship Salon",
      mapQuery: "Downtown+Dubai+Fashion+Avenue",
      services: [
        "Private Olfactory Scent Flights",
        "24kt Gold Flacon Custom Monogramming",
        "Vintage Agarwood Incense Ceremonies",
        "Royal Hospitality with Arabic Gahwa & Dates",
      ],
    },
    {
      id: "mohali-boutique",
      name: "Miya Ji Oud Flagship Boutique",
      region: "india",
      city: "Mohali (Chandigarh Tricity)",
      country: "India",
      address: "2266 Phase 7, Sector 61, Mohali, Punjab 160062",
      phone: "+91-9888881908",
      hours: "Monday – Saturday: 10:00 AM – 8:30 PM IST",
      image: "/assets/Final-Store-Image-2-scaled.jpg",
      badge: "Bespoke Bridal & Gifting Lounge",
      mapQuery: "2266+Phase+7+Mohali+Punjab+160062",
      services: [
        "Bespoke Wedding Fragrance Bars",
        "Luxury Corporate Gifting Chests",
        "Single-Origin Pure Attar Consultations",
        "Artisanal Bakhoor Burner Demonstrations",
      ],
    },
    {
      id: "delhi-suite",
      name: "Miya Ji Oud Private Patron Suite",
      region: "india",
      city: "New Delhi",
      country: "India",
      address: "The Diplomatic Enclave, Chanakyapuri, New Delhi 110021",
      phone: "+91-9888881908",
      hours: "By Private Appointment Only (VIP Patrons)",
      image: "/assets/WhatsApp-Image-2021-01-18-at-12.25.35-PM-1.jpg",
      badge: "Private VIP Suite",
      mapQuery: "Chanakyapuri+New+Delhi",
      services: [
        "Diplomatic & Royal Delegation Tastings",
        "Rare 12-Year Barrel Reserve Sampling",
        "Private Concierge Delivery Services",
      ],
    },
    {
      id: "london-showroom",
      name: "Miya Ji Oud International Salon",
      region: "uk",
      city: "Mayfair, London",
      country: "United Kingdom",
      address: "New Bond Street, Mayfair, London W1S 2TE, United Kingdom",
      phone: "+44 20 7946 0991",
      hours: "Monday – Saturday: 10:00 AM – 7:00 PM GMT",
      image: "/assets/Final-Store-Image-2-scaled.jpg",
      badge: "European Representative Salon",
      mapQuery: "New+Bond+Street+Mayfair+London",
      services: [
        "International Royal Patron Consultation",
        "Haute Oriental & French Accord Blending",
        "Insured Global Diplomatic Dispatch",
      ],
    },
  ];

  const filteredBoutiques =
    activeRegion === "all"
      ? boutiques
      : boutiques.filter((b) => b.region === activeRegion);

  return (
    <div className="relative min-h-screen bg-[#FFFFFF] text-[#1A1A1A] selection:bg-[#DCA52D] selection:text-white">
      {/* 1. Header / Navbar */}
      <Navbar />

      <main>
        {/* Hero Header */}
        <section className="relative bg-[#FAF8F5] border-b border-[#EAE5D9] py-14 sm:py-20 md:py-24 overflow-hidden">
          {/* Subtle Radial Ambient Gold Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#DCA52D]/5 rounded-full blur-[120px] pointer-events-none" />

          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 text-center relative z-10">
            {/* Breadcrumb */}
            <div className="flex items-center justify-center space-x-2 text-xs uppercase tracking-[0.2em] text-[#888888] mb-4">
              <Link href="/" className="hover:text-[#DCA52D] transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-[#DCA52D] font-medium">Stores</span>
            </div>

            <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-[#FFFFFF] border border-[#DCA52D]/40 rounded-full text-[10px] uppercase tracking-[0.24em] text-[#9A7016] mb-4 shadow-xs">
              <Crown className="w-3.5 h-3.5 text-[#DCA52D]" />
              <span>Flagship Boutiques & Salons</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#1A1A1A] tracking-wide font-normal max-w-4xl mx-auto leading-tight">
              Our Boutique Retail Salons
            </h1>
            <div className="w-16 h-[2px] bg-[#DCA52D] mx-auto my-5" />
            <p className="text-sm sm:text-base text-[#666666] font-light max-w-2xl mx-auto leading-relaxed">
              Step into an intimate sanctuary of golden brass, hand-hammered flacons, and the intoxicating sillage of burning royal agarwood.
            </p>
          </div>
        </section>

        {/* Section 1: Virtual Boutique Video Tour Experience */}
        <section className="py-12 sm:py-16 bg-[#FFFFFF]">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
            <div className="relative w-full h-[320px] sm:h-[420px] md:h-[500px] lg:h-[560px] rounded-2xl overflow-hidden border border-[#EAE5D9] shadow-lg group">
              <Image
                src="/assets/Final-Store-Image-2-scaled.jpg"
                alt="Inside Miya Ji Oud Luxury Boutique Interior"
                fill
                className="object-cover object-center transition-transform duration-1000 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/40" />

              {/* Center Play Button */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                <button
                  onClick={() => setVideoModalOpen(true)}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#FFFFFF]/90 hover:bg-[#FFFFFF] border-2 border-[#DCA52D] flex items-center justify-center text-[#DCA52D] shadow-2xl hover:scale-110 transition-all duration-300 backdrop-blur-md cursor-pointer mb-4"
                  aria-label="Play Boutique Virtual Tour"
                >
                  <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-[#DCA52D] ml-1" />
                </button>
                <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#F5F2EB] font-bold drop-shadow">
                  Watch Virtual Boutique Tour
                </span>
                <p className="text-xs text-[#EAE5D9] font-light mt-1 max-w-md hidden sm:block">
                  Experience the architecture, private tasting bar, and artisanal agarwood flacons of our flagship salon.
                </p>
              </div>

              {/* Bottom Badge */}
              <div className="absolute bottom-6 left-6 hidden md:flex items-center space-x-3 bg-black/60 backdrop-blur-md border border-[#DCA52D]/40 px-4 py-2.5 rounded-lg text-white">
                <ShieldCheck className="w-5 h-5 text-[#DCA52D]" />
                <span className="text-xs uppercase tracking-wider font-medium">
                  Private Appointments & Walk-ins Welcome
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Regional Filters & Boutique Locations Grid */}
        <section className="py-12 sm:py-16 md:py-20 bg-[#FAF8F5] border-y border-[#EAE5D9]">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
            {/* Filter Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12 sm:mb-16">
              {[
                { id: "all", label: "All Global Salons" },
                { id: "uae", label: "United Arab Emirates" },
                { id: "india", label: "India (Mohali & Delhi)" },
                { id: "uk", label: "United Kingdom (London)" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveRegion(tab.id as any)}
                  className={`px-5 py-2.5 text-xs uppercase tracking-[0.18em] font-semibold transition-all duration-200 cursor-pointer ${
                    activeRegion === tab.id
                      ? "bg-[#DCA52D] text-white shadow-sm"
                      : "bg-[#FFFFFF] border border-[#EAE5D9] text-[#666666] hover:text-[#1A1A1A] hover:border-[#DCA52D]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Boutiques Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
              {filteredBoutiques.map((boutique) => (
                <div
                  key={boutique.id}
                  className="bg-[#FFFFFF] border border-[#EAE5D9] shadow-xs overflow-hidden flex flex-col justify-between group hover:border-[#DCA52D] transition-colors"
                >
                  {/* Top Image Preview */}
                  <div className="relative h-64 sm:h-72 w-full bg-[#0A0A0C] overflow-hidden">
                    <Image
                      src={boutique.image}
                      alt={boutique.name}
                      fill
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                    {/* Badge */}
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#9A7016] border border-[#EAE5D9] shadow-xs">
                      {boutique.badge}
                    </div>

                    {/* City / Country Overlay */}
                    <div className="absolute bottom-4 left-4 text-white">
                      <p className="text-xs uppercase tracking-[0.2em] text-[#DCA52D] font-bold">
                        {boutique.city}
                      </p>
                      <h3 className="font-serif text-xl sm:text-2xl font-normal drop-shadow">
                        {boutique.name}
                      </h3>
                    </div>
                  </div>

                  {/* Details Body */}
                  <div className="p-6 sm:p-8 space-y-5 flex-1 flex flex-col justify-between">
                    <div className="space-y-4">
                      {/* Address */}
                      <div className="flex items-start space-x-3 text-xs text-[#4A4A4A]">
                        <MapPin className="w-4 h-4 text-[#DCA52D] flex-shrink-0 mt-0.5" />
                        <span className="leading-relaxed font-light">{boutique.address}</span>
                      </div>

                      {/* Phone */}
                      <div className="flex items-center space-x-3 text-xs">
                        <Phone className="w-4 h-4 text-[#DCA52D] flex-shrink-0" />
                        <a
                          href={`tel:${boutique.phone.replace(/[^0-9+]/g, "")}`}
                          className="font-semibold text-[#1A1A1A] hover:text-[#DCA52D] transition-colors tracking-wide"
                        >
                          {boutique.phone}
                        </a>
                      </div>

                      {/* Hours */}
                      <div className="flex items-start space-x-3 text-xs text-[#666666]">
                        <Clock className="w-4 h-4 text-[#DCA52D] flex-shrink-0 mt-0.5" />
                        <span className="font-light">{boutique.hours}</span>
                      </div>

                      {/* Signature Amenities */}
                      <div className="pt-2 border-t border-[#EAE5D9]">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-[#9A7016] font-bold mb-2">
                          Exclusive Salon Experiences:
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-[#555555]">
                          {boutique.services.map((svc, i) => (
                            <div key={i} className="flex items-center space-x-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#DCA52D] flex-shrink-0" />
                              <span className="truncate">{svc}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[#EAE5D9]">
                      <a
                        href={`https://maps.google.com/?q=${encodeURIComponent(boutique.mapQuery)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center space-x-1.5 py-3 px-3 bg-[#FAF8F5] border border-[#EAE5D9] hover:border-[#DCA52D] hover:text-[#DCA52D] text-[#1A1A1A] text-xs font-semibold uppercase tracking-[0.15em] transition-all"
                      >
                        <Navigation className="w-3.5 h-3.5" />
                        <span>Directions</span>
                      </a>

                      <a
                        href="https://wa.me/919888881908?text=Hello%20Miya%20Ji%20Oud,%20I%20would%20like%20to%20reserve%20a%20private%20boutique%20appointment."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center space-x-1.5 py-3 px-3 bg-[#DCA52D] hover:bg-[#B8861B] text-white text-xs font-bold uppercase tracking-[0.15em] transition-all shadow-xs"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Book Visit</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: The Royal In-Store Hospitality Amenities */}
        <section className="py-16 sm:py-20 md:py-24 bg-[#FFFFFF]">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 text-center">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#DCA52D] font-bold">
              The Patron Experience
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#1A1A1A] font-normal mt-1.5">
              Complimentary Boutique Amenities
            </h2>
            <div className="w-12 h-[2px] bg-[#DCA52D] mx-auto my-4" />
            <p className="text-xs sm:text-sm text-[#666666] font-light max-w-xl mx-auto mb-14">
              Every visit to our flagship salons is an immersive ritual of imperial Arabian hospitality.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 bg-[#FAF8F5] border border-[#EAE5D9]">
                <Coffee className="w-7 h-7 text-[#DCA52D] mx-auto mb-3" />
                <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-[#1A1A1A] mb-1.5">
                  Arabian Gahwa & Dates
                </h4>
                <p className="text-xs text-[#666666] font-light leading-relaxed">
                  Traditional welcoming ceremony with freshly brewed cardamom coffee and organic royal dates.
                </p>
              </div>

              <div className="p-6 bg-[#FAF8F5] border border-[#EAE5D9]">
                <Crown className="w-7 h-7 text-[#DCA52D] mx-auto mb-3" />
                <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-[#1A1A1A] mb-1.5">
                  Private Scent Flights
                </h4>
                <p className="text-xs text-[#666666] font-light leading-relaxed">
                  One-on-one consultation with a trained master nose to identify your custom olfactory profile.
                </p>
              </div>

              <div className="p-6 bg-[#FAF8F5] border border-[#EAE5D9]">
                <Sparkles className="w-7 h-7 text-[#DCA52D] mx-auto mb-3" />
                <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-[#1A1A1A] mb-1.5">
                  Custom Flacon Engraving
                </h4>
                <p className="text-xs text-[#666666] font-light leading-relaxed">
                  Complimentary calligraphic gold engraving of your name or personal monogram onto full crystal flacons.
                </p>
              </div>

              <div className="p-6 bg-[#FAF8F5] border border-[#EAE5D9]">
                <ShieldCheck className="w-7 h-7 text-[#DCA52D] mx-auto mb-3" />
                <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-[#1A1A1A] mb-1.5">
                  VIP Gift Packaging
                </h4>
                <p className="text-xs text-[#666666] font-light leading-relaxed">
                  Artisanal velvet coffret boxes, hand-tied satin ribbons, and personalized patronage certificates.
                </p>
              </div>
            </div>

            {/* Bottom Call to Action */}
            <div className="mt-14 p-8 bg-[#FAF8F5] border border-[#DCA52D]/40 max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="text-left">
                <h4 className="font-serif text-lg font-bold text-[#1A1A1A]">
                  Planning a Visit or Bridal Consultation?
                </h4>
                <p className="text-xs text-[#666666] font-light mt-1">
                  Notify our concierge in advance so we can prepare your private flight and custom sample coffret.
                </p>
              </div>
              <Link
                href="/contact"
                className="whitespace-nowrap px-6 py-3 bg-[#DCA52D] hover:bg-[#B8861B] text-white text-xs font-bold uppercase tracking-[0.2em] transition-all shadow-sm"
              >
                Schedule Consultation
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Video Tour Modal */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
          <div className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden border border-[#DCA52D]/40 shadow-2xl">
            <button
              onClick={() => setVideoModalOpen(false)}
              className="absolute top-4 right-4 z-10 text-white hover:text-[#DCA52D] bg-black/60 p-2 rounded-full transition-colors cursor-pointer"
              aria-label="Close video tour"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="relative w-full aspect-video">
              <video
                src="https://cdn.shopify.com/videos/c/o/v/c50d741367364b89a9bb19e4e8279a17.mp4"
                controls
                autoPlay
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      )}

      {/* Footer & Floating Action Buttons */}
      <Footer />
      <FloatingButtons />
    </div>
  );
}
