import { Metadata } from "next";
import AuthForm from "@/components/AuthForm";

export const metadata: Metadata = {
  title: "Sign In | Royal Patron Chamber | MIYA JI OUD",
  description: "Sign in to access your bespoke orders, private collections, and royal privileges at Miya Ji Oud.",
};

export default function LoginPage() {
  return <AuthForm initialMode="login" />;
}
