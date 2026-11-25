"use client";

import React, { useState } from "react";
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
} from "lucide-react";

export default function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("Bespoke Fragrance Consultation");
  const [message, setMessage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
      setErrorMessage("Network error. Please try again or reach out on WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact-us" className="w-full bg-[#FFFFFF] py-16 sm:py-20 md:py-28 border-t border-[#EAE5D9] scroll-mt-20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 md:mb-20">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#FAF8F5] border border-[#DCA52D]/40 rounded-full text-[10px] uppercase tracking-[0.22em] text-[#9A7016] mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#DCA52D]" />
            <span>Royal Concierge</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[40px] text-[#1A1A1A] tracking-wide font-normal">
            Connect With Our Perfumery
          </h2>
          <div className="w-12 h-[2px] bg-[#DCA52D] mx-auto mt-4 mb-4" />
          <p className="text-xs sm:text-sm text-[#666666] font-light leading-relaxed tracking-wide">
            Whether inquiring about bespoke vintage flacons, wedding fragrance bars, or corporate gifting, our fragrance concierges await your command.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left Column: Direct Concierge Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#FAF8F5] border border-[#EAE5D9] p-6 sm:p-8 space-y-6 shadow-xs">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#DCA52D] font-bold">
                  Flagship Concierge
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-[#1A1A1A] font-normal mt-1 mb-3">
                  Direct Royal Assistance
                </h3>
                <p className="text-xs text-[#666666] leading-relaxed font-light">
                  Our private salon concierges in Dubai and Mohali provide personalized guidance on selecting individual olfactory signatures.
                </p>
              </div>

              {/* Contact Info Items */}
              <div className="space-y-4 pt-2">
                {/* Address */}
                <div className="flex items-start space-x-3.5">
                  <div className="w-9 h-9 rounded-full bg-[#FFFFFF] border border-[#EAE5D9] flex items-center justify-center flex-shrink-0 text-[#DCA52D] shadow-xs">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">
                      Private Boutique Address
                    </h4>
                    <p className="text-xs text-[#666666] mt-0.5 leading-relaxed font-light">
                      2266 Phase 7, Mohali, Punjab 160062 • Dubai UAE
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
                      Concierge Hotline
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
                      Private Mailbox
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
                      Boutique Hours
                    </h4>
                    <p className="text-xs text-[#666666] mt-0.5 font-light">
                      Mon – Sat: 10:00 AM – 8:00 PM IST
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick WhatsApp Action Button */}
              <div className="pt-4 border-t border-[#EAE5D9]">
                <a
                  href="https://wa.me/919888881908?text=Hello%20Miya%20Ji%20Oud,%20I%20would%20like%20to%20inquire%20about%20your%20luxury%20perfume%20collection."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center space-x-2 py-3 px-4 bg-[#25D366] hover:bg-[#20BE5A] text-white text-xs font-bold uppercase tracking-[0.16em] transition-all shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp Directly</span>
                </a>
              </div>
            </div>

            {/* Bespoke Services Box */}
            <div className="p-5 bg-[#FAF8F5] border border-[#EAE5D9] flex items-center space-x-4 shadow-xs">
              <Crown className="w-8 h-8 text-[#DCA52D] flex-shrink-0" />
              <div>
                <h5 className="font-serif text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">
                  Wedding & Corporate Gifting
                </h5>
                <p className="text-[11px] text-[#666666] mt-0.5 font-light leading-relaxed">
                  Bespoke engraved flacons and pure oud gift hampers crafted for royalty and grand celebrations.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Live Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#FFFFFF] border border-[#EAE5D9] border-t-2 border-t-[#DCA52D] p-6 sm:p-8 md:p-10 shadow-[0_12px_45px_rgba(0,0,0,0.04)]">
              <div className="mb-6">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#DCA52D] font-bold">
                  Send an Inquiry
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-[#1A1A1A] font-normal mt-1">
                  Message Our Royal Concierge
                </h3>
                <p className="text-xs text-[#777777] font-light mt-1">
                  Fill in the details below. Messages are saved directly to our concierge desk for priority review.
                </p>
              </div>

              {/* Success Notification */}
              {success && (
                <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">Inquiry Transmitted Successfully</p>
                    <p className="mt-0.5 text-emerald-700">
                      Thank you for contacting Miya Ji Oud. A royal fragrance concierge will reach out to you within 24 hours.
                    </p>
                  </div>
                </div>
              )}

              {/* Error Notification */}
              {errorMessage && (
                <div className="mb-6 p-3.5 bg-red-50 border border-red-200 text-xs text-red-700 flex items-start space-x-3">
                  <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* The Form */}
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

                  {/* Subject Inquiry Type */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.16em] text-[#4A4A4A] mb-1.5 font-semibold">
                      Inquiry Focus
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
                    placeholder="Describe your desired olfactory accords, quantity for bespoke orders, or questions..."
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
                      <span>TRANSMIT TO ROYAL CONCIERGE</span>
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
  );
}
