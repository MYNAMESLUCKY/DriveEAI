"use client";
import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from "@/firebase";
import { googleProvider } from "@/firebase";
import Button from "@/components/ui/Button";

export default function LoginForm({ onLogin }: { onLogin?: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onLogin?.();
    } catch (err: unknown) {
      let message = "Login failed";
      if (err instanceof Error) message = err.message;
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      await signInWithPopup(auth, googleProvider);
      onLogin?.();
    } catch (err: unknown) {
      let message = "Google login failed";
      if (err instanceof Error) message = err.message;
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto bg-white rounded-lg shadow p-6 flex flex-col gap-4">
      <form onSubmit={handleEmailLogin} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border border-green-300 rounded px-3 py-2"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="border border-green-300 rounded px-3 py-2"
          required
        />
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <Button type="submit" loading={loading} fullWidth>Login</Button>
      </form>
      <div className="flex items-center gap-2 my-2">
        <span className="flex-1 border-t border-green-200"></span>
        <span className="text-green-500 text-xs">OR</span>
        <span className="flex-1 border-t border-green-200"></span>
      </div>
      <Button variant="secondary" onClick={handleGoogleLogin} loading={loading} fullWidth>
        Sign in with Google
      </Button>
    </div>
  );
} 