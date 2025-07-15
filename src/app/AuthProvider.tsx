"use client";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, User, signOut } from "firebase/auth";
import { Toaster } from "react-hot-toast";

const AuthContext = createContext<{ user: User | null, loading: boolean }>({ user: null, loading: true });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      <Toaster position="top-center" />
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export function UserProfileMenu() {
  const { user } = useAuth();
  if (!user) return null;
  const phone = user.phoneNumber || "Unknown";
  const handleLogout = async () => {
    await signOut(getAuth());
    if (typeof window !== "undefined") window.location.href = "/login";
  };
  return (
    <li className="relative group">
      <button className="flex items-center gap-2 px-3 py-1 rounded hover:bg-green-800 transition">
        <span className="font-semibold">{phone}</span>
        <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20"><path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.06l3.71-3.83a.75.75 0 1 1 1.08 1.04l-4.25 4.39a.75.75 0 0 1-1.08 0l-4.25-4.39a.75.75 0 0 1 .02-1.06z"/></svg>
      </button>
      <div className="absolute right-0 mt-2 w-48 bg-white text-green-900 rounded shadow-lg border border-green-200 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition z-50">
        <a href="/profile" className="block px-4 py-2 hover:bg-green-50">Profile</a>
        <a href="/order-history" className="block px-4 py-2 hover:bg-green-50">Order History</a>
        <a href="/notifications" className="block px-4 py-2 hover:bg-green-50">Notifications</a>
        <a href="/settings" className="block px-4 py-2 hover:bg-green-50">Settings</a>
        <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-green-50">Logout</button>
      </div>
    </li>
  );
} 