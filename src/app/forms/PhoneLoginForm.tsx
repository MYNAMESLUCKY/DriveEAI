"use client";
import { useState, useRef } from "react";
import { auth } from "@/features/auth/firebaseAuthService";
import { signInWithPhoneNumber, RecaptchaVerifier, ConfirmationResult, User } from "firebase/auth";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";

declare global {
  interface Window {
    recaptchaVerifier?: RecaptchaVerifier;
  }
}

export default function PhoneLoginForm({ onLogin }: { onLogin?: (user: User) => void }) {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const confirmationResult = useRef<ConfirmationResult | null>(null);
  const recaptchaRef = useRef<HTMLDivElement>(null);

  // Set language (optional)
  auth.languageCode = 'en'; // or use auth.useDeviceLanguage();

  const setupRecaptcha = () => {
    if (typeof window !== "undefined" && !window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: () => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
      });
      window.recaptchaVerifier.render();
    }
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      setupRecaptcha();
      const appVerifier = window.recaptchaVerifier;
      confirmationResult.current = await signInWithPhoneNumber(auth, phone, appVerifier);
      setStep("otp");
      toast.success("OTP sent to your phone number");
    } catch (err: unknown) {
      let message = "Failed to send OTP";
      if (err instanceof Error) message = err.message;
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (!confirmationResult.current) throw new Error("No OTP confirmation in progress");
      const result = await confirmationResult.current.confirm(otp);
      onLogin?.(result.user);
      toast.success("Logged in successfully!");
    } catch (err: unknown) {
      let message = "Invalid OTP";
      if (err instanceof Error) message = err.message;
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto bg-white rounded-lg shadow p-6 flex flex-col gap-4">
      {step === "phone" ? (
        <form onSubmit={handleSendOtp} className="flex flex-col gap-4">
          <input
            type="tel"
            placeholder="Enter phone number (e.g. +911234567890)"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            className="border border-green-300 rounded px-3 py-2"
            required
          />
          <div id="recaptcha-container" ref={recaptchaRef} />
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <Button type="submit" loading={loading} fullWidth>Send OTP</Button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={e => setOtp(e.target.value)}
            className="border border-green-300 rounded px-3 py-2"
            required
          />
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <Button type="submit" loading={loading} fullWidth>Verify OTP</Button>
        </form>
      )}
    </div>
  );
}
// Note: For production, ensure your domain is whitelisted in Firebase Auth settings.
