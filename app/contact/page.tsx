"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  CheckCircle2,
  AlertCircle,
  Crown,
  Sparkles,
  ShieldCheck,
  ChevronDown,
} from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("Bespoke Fragrance Consultation");
  const [message, setMessage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // FAQ open/close states
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "Are all Miya Ji Oud perfumes and attars 100% pure?",
      a: "Yes, without exception. We source certified wild Aquilaria agarwood from Assam and Southeast Asia, aged in subterranean dark cellars for up to 12 years. Our flacons contain pure distilled essences without synthetic fillers.",
    },
    {
      q: "How do I commission a bespoke fragrance bar for weddings or royal events?",
      a: "Our private bridal concierge designs custom fragrance bars with engraved crystal flacons, live bakhoor smoke stations, and personalized patron gift hampers. Contact us through the form below or on WhatsApp for bespoke proposals.",
    },
    {
      q: "What are your shipping timelines across India and the GCC?",
      a: "We offer complimentary express insured shipping on orders above ₹4,999. Domestic deliveries in India arrive within 2–4 business days. GCC and Dubai orders are fulfilled via express international air freight within 3–5 business days.",
    },
    {
      q: "Can I experience samples before purchasing full flacons?",
      a: "Every patron order includes complimentary hand-selected sample vials from our reserve catalog. You can also visit our flagship boutique in Mohali or Dubai for a private olfactory flight.",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMessage("Please complete all required fields (Name, Email, Message).");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim() ? `${subject}: ${phone.trim()}` : subject,
          message: `[Subject: ${subject}] ${message.trim()}`,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccess(true);
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
      } else {
        setErrorMessage(data.error || "Failed to submit message. Please try again.");
      }
    } catch {
      setErrorMessage("Network error. Please try again or reach out directly on WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#FFFFFF] text-[#1A1A1A] selection:bg-[#DCA52D] selection:text-white">
      {/* 1. Header / Navbar */}
      <Navbar />

      <main>
        {/* Page Hero Header */}
        <section className="relative bg-[#FAF8F5] border-b border-[#EAE5D9] py-14 sm:py-20 md:py-24 overflow-hidden">
          {/* Subtle Radial Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#DCA52D]/5 rounded-full blur-[120px] pointer-events-none" />

          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 text-center relative z-10">
            {/* Breadcrumb */}
            <div className="flex items-center justify-center space-x-2 text-xs uppercase tracking-[0.2em] text-[#888888] mb-4">
              <Link href="/" className="hover:text-[#DCA52D] transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-[#DCA52D] font-medium">Contact Us</span>
            </div>

            <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-[#FFFFFF] border border-[#DCA52D]/40 rounded-full text-[10px] uppercase tracking-[0.24em] text-[#9A7016] mb-4 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#DCA52D]" />
              <span>Royal Concierge & Consultation</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#1A1A1A] tracking-wide font-normal max-w-4xl mx-auto leading-tight">
              Connect With Miya Ji Oud
            </h1>
            <div className="w-16 h-[2px] bg-[#DCA52D] mx-auto my-5" />
            <p className="text-sm sm:text-base text-[#666666] font-light max-w-2xl mx-auto leading-relaxed">
              We welcome private consultations, wedding fragrance commissions, and general patron inquiries. Our dedicated concierges in Dubai and Mohali are at your service.
            </p>
          </div>
        </section>

        {/* Main Section: Contact Info + Live Form */}
        <section className="py-16 sm:py-20 md:py-24 bg-[#FFFFFF]">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
              {/* Left Column: Direct Concierge Details */}
              <div className="lg:col-span-5 space-y-6">
                {/* Contact Card */}
                <div className="bg-[#FAF8F5] border border-[#EAE5D9] p-6 sm:p-8 space-y-6 shadow-xs">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#DCA52D] font-bold">
                      Flagship Salon
                    </span>
                    <h2 className="font-serif text-xl sm:text-2xl text-[#1A1A1A] font-normal mt-1 mb-2">
                      Private Boutiques & Salon
                    </h2>
                    <p className="text-xs text-[#666666] leading-relaxed font-light">
                      Visit us for an intimate private olfactory flight or connect with our customer concierge team.
                    </p>
                  </div>

                  {/* Channels */}
                  <div className="space-y-4 pt-2">
                    {/* Address 1 */}
                    <div className="flex items-start space-x-3.5">
                      <div className="w-9 h-9 rounded-full bg-[#FFFFFF] border border-[#EAE5D9] flex items-center justify-center flex-shrink-0 text-[#DCA52D] shadow-xs">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">
                          Flagship Boutique
                        </h4>
                        <p className="text-xs text-[#666666] mt-0.5 leading-relaxed font-light">
                          2266 Phase 7, Mohali, Punjab 160062
                        </p>
                      </div>
                    </div>

                    {/* Address 2: Dubai */}
                    <div className="flex items-start space-x-3.5">
                      <div className="w-9 h-9 rounded-full bg-[#FFFFFF] border border-[#EAE5D9] flex items-center justify-center flex-shrink-0 text-[#DCA52D] shadow-xs">
                        <Crown className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">
                          Dubai Private Salon
                        </h4>
                        <p className="text-xs text-[#666666] mt-0.5 leading-relaxed font-light">
                          Downtown Dubai • United Arab Emirates
                        </p>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex items-start space-x-3.5">
                      <div className="w-9 h-9 rounded-full bg-[#FFFFFF] border border-[#EAE5D9] flex items-center justify-center flex-shrink-0 text-[#DCA52D] shadow-xs">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">
                          Direct Hotline
                        </h4>
                        <a
                          href="tel:+919888881908"
                          className="text-xs text-[#DCA52D] hover:underline font-semibold mt-0.5 block tracking-wide"
                        >
                          +91-9888881908
                        </a>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-start space-x-3.5">
                      <div className="w-9 h-9 rounded-full bg-[#FFFFFF] border border-[#EAE5D9] flex items-center justify-center flex-shrink-0 text-[#DCA52D] shadow-xs">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">
                          Concierge Mail
                        </h4>
                        <a
                          href="mailto:concierge@miyajioud.com"
                          className="text-xs text-[#1A1A1A] hover:text-[#DCA52D] transition-colors mt-0.5 block font-medium"
                        >
                          concierge@miyajioud.com
                        </a>
                      </div>
                    </div>

                    {/* Hours */}
                    <div className="flex items-start space-x-3.5">
                      <div className="w-9 h-9 rounded-full bg-[#FFFFFF] border border-[#EAE5D9] flex items-center justify-center flex-shrink-0 text-[#DCA52D] shadow-xs">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">
                          Consultation Hours
                        </h4>
                        <p className="text-xs text-[#666666] mt-0.5 font-light">
                          Monday – Saturday: 10:00 AM – 8:00 PM IST
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* WhatsApp Quick CTA */}
                  <div className="pt-4 border-t border-[#EAE5D9]">
                    <a
                      href="https://wa.me/919888881908?text=Hello%20Miya%20Ji%20Oud,%20I%20would%20like%20to%20inquire%20about%20your%20luxury%20perfume%20collection."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center space-x-2 py-3 px-4 bg-[#25D366] hover:bg-[#20BE5A] text-white text-xs font-bold uppercase tracking-[0.16em] transition-all shadow-xs"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Instant Chat on WhatsApp</span>
                    </a>
                  </div>
                </div>

                {/* Gifting & Wedding Highlight */}
                <div className="p-5 bg-[#FAF8F5] border border-[#EAE5D9] flex items-center space-x-4 shadow-xs">
                  <ShieldCheck className="w-8 h-8 text-[#DCA52D] flex-shrink-0" />
                  <div>
                    <h5 className="font-serif text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">
                      Bespoke Wedding & VIP Gifting
                    </h5>
                    <p className="text-[11px] text-[#666666] mt-0.5 font-light leading-relaxed">
                      Custom engraved flacons, luxury gift chests, and pure aged oud oils tailored for memorable royal celebrations.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Live Form */}
              <div className="lg:col-span-7">
                <div className="bg-[#FFFFFF] border border-[#EAE5D9] border-t-2 border-t-[#DCA52D] p-6 sm:p-8 md:p-10 shadow-[0_12px_45px_rgba(0,0,0,0.04)]">
                  <div className="mb-6">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#DCA52D] font-bold">
                      Inquiry Desk
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl text-[#1A1A1A] font-normal mt-1">
                      Send a Message to the Concierge
                    </h3>
                    <p className="text-xs text-[#777777] font-light mt-1">
                      Our customer team reviews all inquiries promptly. Messages are stored securely in our royal concierge database.
                    </p>
                  </div>

                  {/* Success Message */}
                  {success && (
                    <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-start space-x-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold">Inquiry Successfully Transmitted</p>
                        <p className="mt-0.5 text-emerald-700">
                          Thank you for reaching out to Miya Ji Oud. A concierge specialist will respond within 24 hours.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Error Message */}
                  {errorMessage && (
                    <div className="mb-6 p-3.5 bg-red-50 border border-red-200 text-xs text-red-700 flex items-start space-x-3">
                      <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div>
                        <label className="block text-[11px] uppercase tracking-[0.16em] text-[#4A4A4A] mb-1.5 font-semibold">
                          Your Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Paras Sharma"
                          required
                          className="w-full bg-[#FAF8F5] border border-[#EAE5D9] focus:border-[#DCA52D] focus:bg-[#FFFFFF] text-[#1A1A1A] text-xs sm:text-sm px-3.5 py-2.5 outline-none transition-all placeholder:text-[#AAAAAA]"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-[11px] uppercase tracking-[0.16em] text-[#4A4A4A] mb-1.5 font-semibold">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="patron@domain.com"
                          required
                          className="w-full bg-[#FAF8F5] border border-[#EAE5D9] focus:border-[#DCA52D] focus:bg-[#FFFFFF] text-[#1A1A1A] text-xs sm:text-sm px-3.5 py-2.5 outline-none transition-all placeholder:text-[#AAAAAA]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Phone */}
                      <div>
                        <label className="block text-[11px] uppercase tracking-[0.16em] text-[#4A4A4A] mb-1.5 font-semibold">
                          Phone Number <span className="text-[#888888] font-normal">(Optional)</span>
                        </label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 98888 81908"
                          className="w-full bg-[#FAF8F5] border border-[#EAE5D9] focus:border-[#DCA52D] focus:bg-[#FFFFFF] text-[#1A1A1A] text-xs sm:text-sm px-3.5 py-2.5 outline-none transition-all placeholder:text-[#AAAAAA]"
                        />
                      </div>

                      {/* Inquiry Focus */}
                      <div>
                        <label className="block text-[11px] uppercase tracking-[0.16em] text-[#4A4A4A] mb-1.5 font-semibold">
                          Inquiry Type
                        </label>
                        <select
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          className="w-full bg-[#FAF8F5] border border-[#EAE5D9] focus:border-[#DCA52D] focus:bg-[#FFFFFF] text-[#1A1A1A] text-xs sm:text-sm px-3.5 py-2.5 outline-none transition-all cursor-pointer"
                        >
                          <option value="Bespoke Fragrance Consultation">Bespoke Fragrance Consultation</option>
                          <option value="Wedding & Royal Event Scent Bar">Wedding & Royal Event Scent Bar</option>
                          <option value="VIP Corporate & Festive Gifting">VIP Corporate & Festive Gifting</option>
                          <option value="Pure Distilled Oud & Bakhoor Inquiries">Pure Distilled Oud & Bakhoor Inquiries</option>
                          <option value="Order Status & Private Delivery">Order Status & Private Delivery</option>
                          <option value="General Concierge Assistance">General Concierge Assistance</option>
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.16em] text-[#4A4A4A] mb-1.5 font-semibold">
                        Inquiry Details <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Please write your questions, bespoke volume requirements, or perfume notes of interest..."
                        required
                        className="w-full bg-[#FAF8F5] border border-[#EAE5D9] focus:border-[#DCA52D] focus:bg-[#FFFFFF] text-[#1A1A1A] text-xs sm:text-sm p-3.5 outline-none transition-all placeholder:text-[#AAAAAA] resize-y"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 bg-[#DCA52D] hover:bg-[#B8861B] text-white font-bold text-xs uppercase tracking-[0.2em] transition-all shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center space-x-2"
                    >
                      {isSubmitting ? (
                        <span>TRANSMITTING INQUIRY...</span>
                      ) : (
                        <>
                          <span>SEND INQUIRY TO CONCIERGE</span>
                          <Send className="w-3.5 h-3.5 text-white" />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: FAQ Accordion */}
        <section className="py-16 sm:py-20 bg-[#FAF8F5] border-t border-[#EAE5D9]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#DCA52D] font-bold">
                Assistance & Guidance
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#1A1A1A] font-normal mt-1.5">
                Frequently Asked Questions
              </h2>
              <div className="w-12 h-[2px] bg-[#DCA52D] mx-auto my-3" />
            </div>

            {/* FAQs List */}
            <div className="space-y-3">
              {faqs.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#FFFFFF] border border-[#EAE5D9] overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full flex items-center justify-between p-4 sm:p-5 text-left text-xs sm:text-sm font-semibold text-[#1A1A1A] hover:text-[#DCA52D] transition-colors cursor-pointer"
                  >
                    <span>{item.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#DCA52D] transition-transform duration-200 flex-shrink-0 ml-3 ${
                        openFaq === idx ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openFaq === idx && (
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs text-[#666666] font-light leading-relaxed border-t border-[#EAE5D9]/60 pt-3">
                      {item.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer & Floating Action Buttons */}
      <Footer />
      <FloatingButtons />
    </div>
  );
}
