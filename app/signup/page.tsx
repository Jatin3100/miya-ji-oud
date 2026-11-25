import { Metadata } from "next";
import AuthForm from "@/components/AuthForm";

export const metadata: Metadata = {
  title: "Become a Royal Patron | Sign Up | MIYA JI OUD",
  description: "Join the inner circle of Miya Ji Oud. Access private vintage agarwood reserves and bespoke luxury privileges.",
};

export default function SignupPage() {
  return <AuthForm initialMode="signup" />;
}
