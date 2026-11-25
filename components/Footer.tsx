"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail } from "lucide-react";
import { SITE_CONFIG } from "@/data/products";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ text: string; error?: boolean } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      setSubmitting(true);
      setStatusMsg(null);
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        setStatusMsg({ text: data.message || "Thank you for subscribing to the Royal Circle!" });
        setEmail("");
      } else {
        setStatusMsg({ text: data.error || "Failed to subscribe", error: true });
      }
    } catch (err) {
      setStatusMsg({ text: "Network error. Please try again later.", error: true });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <footer id="footer" className="w-full bg-[#F8F6F0] text-[#1A1A1A] border-t border-[#EAE5D9] pt-16 pb-12">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* 4 Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-14 border-b border-[#EAE5D9]">
          {/* Column 1: About Oud Arabia */}
          <div>
            <h3 className="text-[#1A1A1A] text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase mb-5">
              ABOUT {SITE_CONFIG.name}
            </h3>
            <p className="text-[#2C2620] text-xs sm:text-[13px] leading-relaxed font-normal">
              We believe that a perfumer is a poet or a storyteller who use
              intangible ingredients to create emotions. The main idea behind {SITE_CONFIG.name} is to Abstract memories that evoke our cores. We paint
              pictures without using paint. We are storytellers who do not need
              words. The raw materials we use to make our perfumes express our
              ideas and visions using the language of scent.
            </p>
          </div>

          {/* Column 2: Customer Care */}
          <div>
            <h3 className="text-[#1A1A1A] text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase mb-5">
              CUSTOMER CARE
            </h3>
            <div className="space-y-3 text-xs sm:text-[13px] text-[#2C2620] font-normal leading-relaxed">
              <p>
                <span className="text-[#1A1A1A] font-semibold">Phone:</span>{" "}
                <a
                  href="tel:+919888881908"
                  className="hover:text-[#DCA52D] transition-colors"
                >
                  +91-9888881908
                </a>
              </p>
              <p>
                <span className="text-[#1A1A1A] font-semibold">Mail:</span>{" "}
                <a
                  href="mailto:concierge@miyajioud.com"
                  className="hover:text-[#DCA52D] transition-colors"
                >
                  concierge@miyajioud.com
                </a>
              </p>
              <p>
                <span className="text-[#1A1A1A] font-semibold">Address:</span>{" "}
                2266 Phase 7 Mohali Punjab 160062
              </p>
            </div>
          </div>

          {/* Column 3: Quick Links */}
          <div>
            <h3 className="text-[#1A1A1A] text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase mb-5">
              QUICK LINKS
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-[13px] text-[#2C2620] font-normal">
              <li>
                <Link
                  href="/about"
                  className="hover:text-[#DCA52D] transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-[#DCA52D] transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/stores"
                  className="hover:text-[#DCA52D] transition-colors"
                >
                  Store Locator
                </Link>
              </li>
              <li>
                <Link
                  href="#privacy"
                  className="hover:text-[#DCA52D] transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#refund"
                  className="hover:text-[#DCA52D] transition-colors"
                >
                  Refund & Returns Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#shipping"
                  className="hover:text-[#DCA52D] transition-colors"
                >
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#terms"
                  className="hover:text-[#DCA52D] transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter Subscription & Social Links */}
          <div>
            <h3 className="text-[#1A1A1A] text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase mb-5">
              GET NOTIFIED ABOUT NEW PRODUCTS
            </h3>
            <form onSubmit={handleSubmit} className="mb-6">
              <div className="relative flex items-center border border-[#EAE5D9] bg-[#FFFFFF] focus-within:border-[#DCA52D] rounded-xl transition-colors shadow-sm overflow-hidden">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full bg-transparent px-4 py-3 text-xs text-[#1A1A1A] placeholder-[#888888] focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  aria-label="Subscribe to newsletter"
                  className="bg-[#DCA52D] hover:bg-[#B8861B] text-[#FFFFFF] px-4 py-3 transition-colors flex items-center justify-center cursor-pointer shadow-md disabled:opacity-50"
                >
                  <Mail className="w-4 h-4" />
                </button>
              </div>
              {statusMsg && (
                <p
                  className={`text-[11px] mt-2 font-medium ${
                    statusMsg.error ? "text-red-500" : "text-[#DCA52D]"
                  }`}
                >
                  {statusMsg.text}
                </p>
              )}
            </form>

            {/* Social Media Icons */}
            <div className="flex items-center space-x-4 text-[#666666]">
              <a
                href="https://www.instagram.com/oudarabiaofficial/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#DCA52D] transition-colors p-1"
                aria-label="Instagram"
              >
                <svg
                  className="w-5 h-5 fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://facebook.com/pages/category/Shopping---Retail/oudarabiaofficial-104279967663235/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#DCA52D] transition-colors p-1"
                aria-label="Facebook"
              >
                <svg
                  className="w-5 h-5 fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                </svg>
              </a>
              <a
                href="https://youtube.com/@oudarabiadubai"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#DCA52D] transition-colors p-1"
                aria-label="YouTube"
              >
                <svg
                  className="w-5 h-5 fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom / Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#3A332C] font-normal space-y-3 sm:space-y-0">
          <p>© 2026 {SITE_CONFIG.name} PRIVATE LIMITED. All rights reserved.</p>
          <p className="hover:text-[#DCA52D] transition-colors">
            Powered by Luxury Craftsmanship
          </p>
        </div>
      </div>
    </footer>
  );
}
