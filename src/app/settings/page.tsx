"use client";
import { useAuth } from "../AuthProvider";
import SectionTitle from "@/components/ui/SectionTitle";

export default function SettingsPage() {
  const { user, loading } = useAuth();
  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  if (!user) {
    if (typeof window !== "undefined") window.location.href = "/login";
    return <div className="flex justify-center items-center min-h-screen">Redirecting to login...</div>;
  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white py-10 px-4">
      <SectionTitle>Settings</SectionTitle>
      <div className="bg-green-50 rounded-lg shadow p-6 w-full max-w-md flex flex-col gap-4 items-center">
        <div className="text-green-700">User preferences and settings will appear here in the future.</div>
      </div>
    </div>
  );
} 