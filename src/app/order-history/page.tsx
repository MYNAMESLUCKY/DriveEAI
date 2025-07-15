"use client";
import { useAuth } from "../AuthProvider";
import SectionTitle from "@/components/ui/SectionTitle";
import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { collection, query, where, orderBy, onSnapshot, Timestamp } from "firebase/firestore";

interface OrderEnquiry {
  id: string;
  name: string;
  contact: string;
  riceType: string;
  quantity: string;
  location: string;
  submittedAt: Timestamp;
}

export default function OrderHistoryPage() {
  const { user, loading } = useAuth();
  const [orders, setOrders] = useState<OrderEnquiry[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    if (!user) return;
    const q = query(
      collection(db, "orderEnquiries"),
      where("contact", "==", user.phoneNumber),
      orderBy("submittedAt", "desc")
    );
    const unsub = onSnapshot(q, (snapshot) => {
      setOrders(
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as OrderEnquiry))
      );
      setLoadingOrders(false);
    });
    return () => unsub();
  }, [user]);

  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  if (!user) {
    if (typeof window !== "undefined") window.location.href = "/login";
    return <div className="flex justify-center items-center min-h-screen">Redirecting to login...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white py-10 px-4">
      <SectionTitle>Order History</SectionTitle>
      <div className="bg-green-50 rounded-lg shadow p-6 w-full max-w-2xl flex flex-col gap-4 items-center">
        {loadingOrders ? (
          <div>Loading your orders...</div>
        ) : orders.length === 0 ? (
          <div className="text-green-700">No orders found.</div>
        ) : (
          <ul className="w-full flex flex-col gap-2">
            {orders.map((order) => (
              <li key={order.id} className="bg-white border border-green-200 rounded px-4 py-2 shadow-sm">
                <div className="font-medium">{order.riceType} - {order.quantity} kg</div>
                <div className="text-sm text-green-700">Location: {order.location}</div>
                <div className="text-xs text-green-500 mt-1">{order.submittedAt.toDate().toLocaleString()}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
} 