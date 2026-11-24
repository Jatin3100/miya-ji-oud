import type { Metadata } from "next";
import { Poppins, Cinzel } from "next/font/google";
import "./globals.css";
import { SITE_CONFIG } from "@/data/products";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: SITE_CONFIG.fullName,
  description: SITE_CONFIG.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body
        className={`${poppins.variable} ${cinzel.variable} antialiased bg-[#FFFFFF] text-[#1A1A1A] min-h-screen selection:bg-[#DCA52D] selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
