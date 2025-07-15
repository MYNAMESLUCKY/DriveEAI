"use client";
import PhoneLoginForm from "../forms/PhoneLoginForm";
import SectionTitle from "@/components/ui/SectionTitle";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 py-10 px-4">
      <SectionTitle>Login with Mobile Number</SectionTitle>
      <PhoneLoginForm />
    </div>
  );
} 