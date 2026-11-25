"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  Mail,
  Lock,
  User as UserIcon,
  Phone,
  Eye,
  EyeOff,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Crown,
  Sparkles,
  ShieldCheck,
  Package,
  Award,
} from "lucide-react";

interface AuthFormProps {
  initialMode?: "login" | "signup";
}

export default function AuthForm({ initialMode = "login" }: AuthFormProps) {
  const router = useRouter();
  const { login, signup, user } = useAuth();

  const [mode, setMode] = useState<"login" | "signup">(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [termsAgreed, setTermsAgreed] = useState(true);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Status states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // If already logged in
  if (user) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-[#FFFFFF] border border-[#EAE5D9] p-8 md:p-10 text-center shadow-[0_10px_35px_rgba(0,0,0,0.04)] relative">
          <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-[#FAF8F5] border border-[#DCA52D]/40 flex items-center justify-center text-[#DCA52D]">
            <Crown className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-2xl md:text-3xl text-[#1A1A1A] tracking-wide mb-1.5 font-normal">
            Welcome, {user.name}
          </h2>
          <p className="text-xs uppercase tracking-[0.22em] text-[#DCA52D] mb-4 font-semibold">
            Royal Patron of Miya Ji Oud
          </p>
          <p className="text-sm text-[#666666] mb-8 font-light">
            You are currently signed in with <span className="text-[#1A1A1A] font-medium">{user.email}</span>.
          </p>

          <Link
            href="/"
            className="w-full inline-block py-3.5 bg-[#DCA52D] hover:bg-[#B8861B] text-white font-semibold text-xs uppercase tracking-[0.2em] transition-all shadow-sm"
          >
            Enter Royal Boutique
          </Link>
        </div>
      </div>
    );
  }

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!email.trim() || !password) {
      setErrorMessage("Please enter both your email address and password.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await login(email, password);
      if (res.success) {
        setSuccessMessage("Authentication successful. Welcome to the Royal Boutique...");
        setTimeout(() => {
          router.push("/");
          router.refresh();
        }, 1200);
      } else {
        setErrorMessage(res.error || "Incorrect email or password.");
      }
    } catch {
      setErrorMessage("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!name.trim()) {
      setErrorMessage("Please provide your full name.");
      return;
    }

    if (!email.trim()) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (!password || password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match. Please verify.");
      return;
    }

    if (!termsAgreed) {
      setErrorMessage("Please accept the terms and privileges to proceed.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await signup(name, email, password, phone);
      if (res.success) {
        setSuccessMessage("Account created successfully! Welcome to the Miya Ji Oud family.");
        setTimeout(() => {
          router.push("/");
          router.refresh();
        }, 1400);
      } else {
        setErrorMessage(res.error || "Signup could not be completed.");
      }
    } catch {
      setErrorMessage("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1A1A1A] flex flex-col justify-between selection:bg-[#DCA52D] selection:text-white">
      {/* Main Header / Navigation */}
      <header className="bg-[#FFFFFF] border-b border-[#EAE5D9] sticky top-0 z-30">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center space-x-2 text-xs uppercase tracking-[0.18em] text-[#666666] hover:text-[#DCA52D] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span className="hidden sm:inline">Return to Boutique</span>
          </Link>

          {/* Center Brand Logo (Theme-consistent) */}
          <Link href="/" className="flex flex-col items-center justify-center leading-tight py-1">
            <span className="font-serif text-[#DCA52D] hover:text-[#B8861B] text-xl sm:text-2xl font-bold tracking-[0.2em] uppercase transition-colors">
              MIYA JI
            </span>
            <span className="font-serif text-[#DCA52D] hover:text-[#B8861B] text-[10px] sm:text-[11px] font-semibold tracking-[0.45em] uppercase transition-colors -mt-0.5 pl-[0.45em]">
              OUD
            </span>
          </Link>

          {/* Right Authenticity Badge */}
          <div className="flex items-center space-x-1.5 text-[11px] uppercase tracking-wider text-[#666666]">
            <ShieldCheck className="w-4 h-4 text-[#DCA52D]" />
            <span className="hidden sm:inline">Luxury Perfumery</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-10 md:py-16">
        <div className="w-full max-w-[480px]">
          {/* Top Title & Subheading */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#FAF8F5] border border-[#DCA52D]/40 rounded-full text-[10px] uppercase tracking-[0.22em] text-[#9A7016] mb-3">
              <Crown className="w-3.5 h-3.5 text-[#DCA52D]" />
              <span>Royal Patronage Portal</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl text-[#1A1A1A] tracking-wide font-normal">
              {mode === "login" ? "Sign In to Your Account" : "Create Patron Account"}
            </h1>
            <p className="text-xs sm:text-sm text-[#777777] font-light mt-1.5 max-w-sm mx-auto">
              {mode === "login"
                ? "Access your private bespoke orders, delivery tracking, and VIP reserves."
                : "Join the inner circle of Miya Ji Oud for private vintage agarwood releases."}
            </p>
          </div>

          {/* White Card with Theme Styling */}
          <div className="bg-[#FFFFFF] border border-[#EAE5D9] border-t-2 border-t-[#DCA52D] p-6 sm:p-8 md:p-10 shadow-[0_12px_45px_rgba(0,0,0,0.04)] relative">
            {/* Mode Switch Tabs */}
            <div className="grid grid-cols-2 border-b border-[#EAE5D9] mb-7">
              <button
                type="button"
                onClick={() => {
                  setMode("login");
                  setErrorMessage(null);
                  setSuccessMessage(null);
                }}
                className={`pb-3 text-xs uppercase tracking-[0.18em] font-medium transition-all relative cursor-pointer ${
                  mode === "login"
                    ? "text-[#1A1A1A] font-bold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#DCA52D]"
                    : "text-[#888888] hover:text-[#1A1A1A]"
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode("signup");
                  setErrorMessage(null);
                  setSuccessMessage(null);
                }}
                className={`pb-3 text-xs uppercase tracking-[0.18em] font-medium transition-all relative cursor-pointer ${
                  mode === "signup"
                    ? "text-[#1A1A1A] font-bold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#DCA52D]"
                    : "text-[#888888] hover:text-[#1A1A1A]"
                }`}
              >
                Create Account
              </button>
            </div>

            {/* Error Notification */}
            {errorMessage && (
              <div className="mb-5 p-3.5 bg-red-50 border border-red-200 flex items-start space-x-3 text-xs text-red-700">
                <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Success Notification */}
            {successMessage && (
              <div className="mb-5 p-3.5 bg-emerald-50 border border-emerald-200 flex items-start space-x-3 text-xs text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>{successMessage}</span>
              </div>
            )}

            {/* ================= LOGIN FORM ================= */}
            {mode === "login" ? (
              <form onSubmit={handleLoginSubmit} className="space-y-5">
                {/* Email Address */}
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.16em] text-[#4A4A4A] mb-2 font-semibold">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#888888] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="concierge@miyajioud.com"
                      required
                      className="w-full bg-[#FAF8F5] border border-[#EAE5D9] focus:border-[#DCA52D] focus:bg-[#FFFFFF] text-[#1A1A1A] text-sm pl-10 pr-4 py-3 outline-none transition-all placeholder:text-[#AAAAAA]"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-[11px] uppercase tracking-[0.16em] text-[#4A4A4A] font-semibold">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() =>
                        alert(
                          "Password reset link has been dispatched to your email address or contact support at concierge@miyajioud.com."
                        )
                      }
                      className="text-[11px] text-[#DCA52D] hover:underline tracking-wider cursor-pointer font-medium"
                    >
                      Forgot?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#888888] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="w-full bg-[#FAF8F5] border border-[#EAE5D9] focus:border-[#DCA52D] focus:bg-[#FFFFFF] text-[#1A1A1A] text-sm pl-10 pr-11 py-3 outline-none transition-all placeholder:text-[#AAAAAA]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#888888] hover:text-[#DCA52D] transition-colors cursor-pointer"
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me */}
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center space-x-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-[#EAE5D9] bg-[#FAF8F5] text-[#DCA52D] focus:ring-0 cursor-pointer accent-[#DCA52D]"
                    />
                    <span className="text-xs text-[#666666] group-hover:text-[#1A1A1A] transition-colors">
                      Remember on this device
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-2 py-3.5 bg-[#DCA52D] hover:bg-[#B8861B] text-white font-bold text-xs uppercase tracking-[0.2em] transition-all duration-300 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <span>AUTHENTICATING...</span>
                  ) : (
                    <>
                      <span>SIGN IN TO CHAMBER</span>
                      <Sparkles className="w-3.5 h-3.5 text-white" />
                    </>
                  )}
                </button>
              </form>
            ) : (
              /* ================= SIGNUP FORM ================= */
              <form onSubmit={handleSignupSubmit} className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.16em] text-[#4A4A4A] mb-1.5 font-semibold">
                    Full Name
                  </label>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 text-[#888888] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Paras Sharma"
                      required
                      className="w-full bg-[#FAF8F5] border border-[#EAE5D9] focus:border-[#DCA52D] focus:bg-[#FFFFFF] text-[#1A1A1A] text-sm pl-10 pr-4 py-2.5 outline-none transition-all placeholder:text-[#AAAAAA]"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.16em] text-[#4A4A4A] mb-1.5 font-semibold">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#888888] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="patron@domain.com"
                      required
                      className="w-full bg-[#FAF8F5] border border-[#EAE5D9] focus:border-[#DCA52D] focus:bg-[#FFFFFF] text-[#1A1A1A] text-sm pl-10 pr-4 py-2.5 outline-none transition-all placeholder:text-[#AAAAAA]"
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.16em] text-[#4A4A4A] mb-1.5 font-semibold">
                    Contact Phone <span className="text-[#888888] font-normal">(Optional)</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#888888] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98888 81908 / +971 50 123 4567"
                      className="w-full bg-[#FAF8F5] border border-[#EAE5D9] focus:border-[#DCA52D] focus:bg-[#FFFFFF] text-[#1A1A1A] text-sm pl-10 pr-4 py-2.5 outline-none transition-all placeholder:text-[#AAAAAA]"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.16em] text-[#4A4A4A] mb-1.5 font-semibold">
                    Password <span className="text-[#888888] font-normal">(min. 6 characters)</span>
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#888888] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="w-full bg-[#FAF8F5] border border-[#EAE5D9] focus:border-[#DCA52D] focus:bg-[#FFFFFF] text-[#1A1A1A] text-sm pl-10 pr-11 py-2.5 outline-none transition-all placeholder:text-[#AAAAAA]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#888888] hover:text-[#DCA52D] transition-colors cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.16em] text-[#4A4A4A] mb-1.5 font-semibold">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#888888] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="w-full bg-[#FAF8F5] border border-[#EAE5D9] focus:border-[#DCA52D] focus:bg-[#FFFFFF] text-[#1A1A1A] text-sm pl-10 pr-11 py-2.5 outline-none transition-all placeholder:text-[#AAAAAA]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#888888] hover:text-[#DCA52D] transition-colors cursor-pointer"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Terms Agreement */}
                <div className="pt-2">
                  <label className="flex items-start space-x-2.5 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={termsAgreed}
                      onChange={(e) => setTermsAgreed(e.target.checked)}
                      className="w-4 h-4 mt-0.5 rounded border-[#EAE5D9] bg-[#FAF8F5] text-[#DCA52D] focus:ring-0 cursor-pointer accent-[#DCA52D]"
                    />
                    <span className="text-xs text-[#666666] group-hover:text-[#1A1A1A] leading-relaxed transition-colors">
                      I agree to the Terms of Royal Patronage & Privacy Policy of Miya Ji Oud.
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-3 py-3.5 bg-[#DCA52D] hover:bg-[#B8861B] text-white font-bold text-xs uppercase tracking-[0.2em] transition-all duration-300 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <span>CREATING ACCOUNT...</span>
                  ) : (
                    <>
                      <span>BECOME A ROYAL PATRON</span>
                      <Crown className="w-3.5 h-3.5 text-white" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Bottom Switch Link */}
            <div className="mt-8 pt-6 border-t border-[#EAE5D9] text-center">
              <p className="text-xs text-[#666666]">
                {mode === "login" ? (
                  <>
                    New to Miya Ji Oud Dubai?{" "}
                    <button
                      type="button"
                      onClick={() => {
                        setMode("signup");
                        setErrorMessage(null);
                        setSuccessMessage(null);
                      }}
                      className="text-[#DCA52D] hover:text-[#B8861B] font-bold underline cursor-pointer ml-1"
                    >
                      Create an account
                    </button>
                  </>
                ) : (
                  <>
                    Already hold royal patronage?{" "}
                    <button
                      type="button"
                      onClick={() => {
                        setMode("login");
                        setErrorMessage(null);
                        setSuccessMessage(null);
                      }}
                      className="text-[#DCA52D] hover:text-[#B8861B] font-bold underline cursor-pointer ml-1"
                    >
                      Sign In here
                    </button>
                  </>
                )}
              </p>
            </div>
          </div>

          {/* Member Privileges Feature Bar (Theme consistent) */}
          <div className="mt-8 grid grid-cols-3 gap-3 text-center">
            <div className="p-3.5 bg-[#FFFFFF] border border-[#EAE5D9] shadow-xs">
              <Package className="w-4 h-4 mx-auto text-[#DCA52D] mb-1.5" />
              <p className="text-[10px] uppercase tracking-wider text-[#1A1A1A] font-bold">VIP Delivery</p>
              <p className="text-[9px] text-[#777777] mt-0.5">GCC & India</p>
            </div>
            <div className="p-3.5 bg-[#FFFFFF] border border-[#EAE5D9] shadow-xs">
              <Sparkles className="w-4 h-4 mx-auto text-[#DCA52D] mb-1.5" />
              <p className="text-[10px] uppercase tracking-wider text-[#1A1A1A] font-bold">Samples</p>
              <p className="text-[9px] text-[#777777] mt-0.5">Complimentary</p>
            </div>
            <div className="p-3.5 bg-[#FFFFFF] border border-[#EAE5D9] shadow-xs">
              <Award className="w-4 h-4 mx-auto text-[#DCA52D] mb-1.5" />
              <p className="text-[10px] uppercase tracking-wider text-[#1A1A1A] font-bold">Authentic</p>
              <p className="text-[9px] text-[#777777] mt-0.5">100% Pure Oud</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer (Consistent with Site Footer) */}
      <footer className="bg-[#FFFFFF] border-t border-[#EAE5D9] py-6 text-center text-xs text-[#777777]">
        <p className="tracking-wider">
          © {new Date().getFullYear()} MIYA JI OUD PRIVATE LIMITED. All rights reserved.
        </p>
        <p className="text-[10px] text-[#999999] tracking-widest uppercase mt-1">
          Powered by Luxury Craftsmanship
        </p>
      </footer>
    </div>
  );
}
