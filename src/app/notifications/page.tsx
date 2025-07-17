"use client";
import { useAuth } from "../AuthProvider";
import SectionTitle from "@/components/ui/SectionTitle";
import { useEffect, useState } from "react";
import { db } from "@/services/firebase";
import { collection, query, where, onSnapshot, Timestamp } from "firebase/firestore";
import toast from "react-hot-toast";

interface Notification {
  id: string;
  message: string;
  createdAt: Timestamp;
  read?: boolean;
}

export default function NotificationsPage() {
  const { user, loading } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loadingNotifs, setLoadingNotifs] = useState(true);

  useEffect(() => {
    if (!user) return;
    const q = query(
      collection(db, "notifications"),
      where("userId", "==", user.uid)
    );
    const unsub = onSnapshot(q, (snapshot) => {
      setNotifications(
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Notification))
      );
      setLoadingNotifs(false);
    }, (error) => {
      toast.error("Failed to load notifications: " + error.message);
      setLoadingNotifs(false);
    });
    return () => unsub();
  }, [user]);

  if (loading) return <div className="flex justify-center items-center min-h-screen"><span className="animate-spin text-3xl">⏳</span></div>;
  if (!user) {
    if (typeof window !== "undefined") window.location.href = "/login";
    return <div className="flex justify-center items-center min-h-screen">Redirecting to login...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white py-10 px-4">
      <SectionTitle>Notifications</SectionTitle>
      <div className="bg-green-50 rounded-lg shadow p-6 w-full max-w-md flex flex-col gap-4 items-center">
        {loadingNotifs ? (
          <div className="flex justify-center items-center"><span className="animate-spin text-2xl">⏳</span> Loading notifications...</div>
        ) : notifications.length === 0 ? (
          <div className="text-green-700">No notifications yet.</div>
        ) : (
          <ul className="w-full flex flex-col gap-2">
            {notifications.map((notif) => (
              <li key={notif.id} className="bg-white border border-green-200 rounded px-4 py-2 shadow-sm flex items-center justify-between">
                <div>
                  <div className="font-medium">{notif.message}</div>
                  <div className="text-xs text-green-500 mt-1">{notif.createdAt.toDate().toLocaleString()}</div>
                </div>
                <button className="ml-4 px-2 py-1 text-xs rounded bg-green-100 hover:bg-green-200 text-green-700 border border-green-300 transition">Mark as read</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
} 