"use client";
import { useAuth } from "../AuthProvider";
import SectionTitle from "@/components/ui/SectionTitle";
import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { collection, query, orderBy, onSnapshot, Timestamp, collection as fsCollection, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import toast from "react-hot-toast";

const ADMIN_PHONES = ["+911234567890"]; // Replace with your admin phone numbers

interface OrderEnquiry {
  id: string;
  name: string;
  contact: string;
  riceType: string;
  quantity: string;
  location: string;
  submittedAt: Timestamp;
  processed: boolean;
}

interface UserDoc {
  id: string;
  phoneNumber: string;
  uid: string;
}

interface NotificationDoc {
  id: string;
  userId: string;
  message: string;
  createdAt: Timestamp;
  read: boolean;
}

export default function AdminPage() {
  const { user, loading } = useAuth();
  const [orders, setOrders] = useState<OrderEnquiry[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [users, setUsers] = useState<UserDoc[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [notifications, setNotifications] = useState<NotificationDoc[]>([]);
  const [loadingNotifications, setLoadingNotifications] = useState(true);
  const [notifPhone, setNotifPhone] = useState("");
  const [notifMessage, setNotifMessage] = useState("");
  const [notifLoading, setNotifLoading] = useState(false);
  // For user modal
  const [selectedUser, setSelectedUser] = useState<UserDoc | null>(null);
  // Search/filter state for orders
  const [orderSearch, setOrderSearch] = useState("");
  const [orderRiceType, setOrderRiceType] = useState("");
  const [orderProcessed, setOrderProcessed] = useState("");
  // Search/filter state for users
  const [userSearch, setUserSearch] = useState("");

  useEffect(() => {
    if (!user || !ADMIN_PHONES.includes(user.phoneNumber || "")) return;
    // Orders
    const q = query(collection(db, "orderEnquiries"), orderBy("submittedAt", "desc"));
    const unsubOrders = onSnapshot(q, (snapshot) => {
      setOrders(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as OrderEnquiry)));
      setLoadingOrders(false);
    });
    // Users
    const usersQ = fsCollection(db, "users");
    const unsubUsers = onSnapshot(usersQ, (snapshot) => {
      setUsers(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as UserDoc)));
      setLoadingUsers(false);
    });
    // Notifications
    const notifQ = query(collection(db, "notifications"), orderBy("createdAt", "desc"));
    const unsubNotifs = onSnapshot(notifQ, (snapshot) => {
      setNotifications(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as NotificationDoc)));
      setLoadingNotifications(false);
    });
    return () => {
      unsubOrders();
      unsubUsers();
      unsubNotifs();
    };
  }, [user]);

  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  if (!user) {
    if (typeof window !== "undefined") window.location.href = "/login";
    return <div className="flex justify-center items-center min-h-screen">Redirecting to login...</div>;
  }
  if (!ADMIN_PHONES.includes(user.phoneNumber || "")) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white py-10 px-4">
        <SectionTitle>Admin Dashboard</SectionTitle>
        <div className="bg-red-100 border border-red-400 text-red-800 px-6 py-4 rounded shadow mb-6">You do not have admin access.</div>
      </div>
    );
  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white py-10 px-4">
      <SectionTitle>Admin Dashboard</SectionTitle>
      <div className="bg-green-50 rounded-lg shadow p-6 w-full max-w-5xl flex flex-col gap-8 items-center">
        <div className="w-full">
          <h2 className="text-lg font-bold mb-2">Order Enquiries</h2>
          <div className="flex flex-wrap gap-2 mb-2">
            <input
              type="text"
              placeholder="Search by name or phone"
              value={orderSearch}
              onChange={e => setOrderSearch(e.target.value)}
              className="border border-green-300 rounded px-3 py-2"
            />
            <input
              type="text"
              placeholder="Rice type"
              value={orderRiceType}
              onChange={e => setOrderRiceType(e.target.value)}
              className="border border-green-300 rounded px-3 py-2"
            />
            <select
              value={orderProcessed}
              onChange={e => setOrderProcessed(e.target.value)}
              className="border border-green-300 rounded px-3 py-2"
            >
              <option value="">All</option>
              <option value="processed">Processed</option>
              <option value="unprocessed">Unprocessed</option>
            </select>
          </div>
          {loadingOrders ? (
            <div className="flex justify-center items-center"><span className="animate-spin text-2xl">⏳</span> Loading orders...</div>
          ) : orders.length === 0 ? (
            <div className="text-green-700">No order enquiries found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border border-green-200 rounded">
                <thead>
                  <tr className="bg-green-100">
                    <th className="px-3 py-2 border">Name</th>
                    <th className="px-3 py-2 border">Contact</th>
                    <th className="px-3 py-2 border">Rice Type</th>
                    <th className="px-3 py-2 border">Quantity</th>
                    <th className="px-3 py-2 border">Location</th>
                    <th className="px-3 py-2 border">Submitted At</th>
                    <th className="px-3 py-2 border">Processed</th>
                    <th className="px-3 py-2 border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders
                    .filter(order =>
                      (!orderSearch || order.name.toLowerCase().includes(orderSearch.toLowerCase()) || order.contact.includes(orderSearch)) &&
                      (!orderRiceType || order.riceType.toLowerCase().includes(orderRiceType.toLowerCase())) &&
                      (!orderProcessed || (orderProcessed === "processed" ? order.processed : !order.processed))
                    )
                    .map((order) => (
                      <tr key={order.id} className="even:bg-green-50">
                        <td className="px-3 py-2 border font-medium">{order.name}</td>
                        <td className="px-3 py-2 border">{order.contact}</td>
                        <td className="px-3 py-2 border">{order.riceType}</td>
                        <td className="px-3 py-2 border">{order.quantity}</td>
                        <td className="px-3 py-2 border">{order.location}</td>
                        <td className="px-3 py-2 border text-xs text-green-700">{order.submittedAt.toDate().toLocaleString()}</td>
                        <td className="px-3 py-2 border text-center">
                          <button
                            className={`px-2 py-1 rounded text-xs font-semibold ${order.processed ? 'bg-green-200 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}
                            onClick={async () => {
                              try {
                                await updateDoc(doc(db, "orderEnquiries", order.id), { processed: !order.processed });
                                toast.success(order.processed ? "Marked as unprocessed" : "Marked as processed");
                              } catch {
                                toast.error("Failed to update status");
                              }
                            }}
                          >
                            {order.processed ? "Processed" : "Unprocessed"}
                          </button>
                        </td>
                        <td className="px-3 py-2 border text-center">
                          <button
                            className="text-red-600 hover:underline mr-2"
                            onClick={async () => {
                              if (!window.confirm("Delete this order enquiry?")) return;
                              try {
                                await deleteDoc(doc(db, "orderEnquiries", order.id));
                                toast.success("Order deleted");
                              } catch {
                                toast.error("Failed to delete order");
                              }
                            }}
                          >Delete</button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div className="w-full">
          <h2 className="text-lg font-bold mb-2">Users</h2>
          <div className="flex flex-wrap gap-2 mb-2">
            <input
              type="text"
              placeholder="Search by phone or UID"
              value={userSearch}
              onChange={e => setUserSearch(e.target.value)}
              className="border border-green-300 rounded px-3 py-2"
            />
          </div>
          {loadingUsers ? (
            <div className="flex justify-center items-center"><span className="animate-spin text-2xl">⏳</span> Loading users...</div>
          ) : users.length === 0 ? (
            <div className="text-green-700">No users found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border border-green-200 rounded">
                <thead>
                  <tr className="bg-green-100">
                    <th className="px-3 py-2 border">Phone Number</th>
                    <th className="px-3 py-2 border">UID</th>
                    <th className="px-3 py-2 border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users
                    .filter(u =>
                      !userSearch || u.phoneNumber.includes(userSearch) || u.uid.includes(userSearch)
                    )
                    .map((u) => (
                      <tr key={u.id} className="even:bg-green-50">
                        <td className="px-3 py-2 border font-medium">{u.phoneNumber}</td>
                        <td className="px-3 py-2 border text-xs">{u.uid}</td>
                        <td className="px-3 py-2 border text-center">
                          <button
                            className="text-blue-600 hover:underline mr-2"
                            onClick={() => setSelectedUser(u)}
                          >View</button>
                          <button
                            className="text-red-600 hover:underline"
                            onClick={async () => {
                              if (!window.confirm("Delete this user?")) return;
                              try {
                                await deleteDoc(doc(db, "users", u.id));
                                toast.success("User deleted");
                              } catch {
                                toast.error("Failed to delete user");
                              }
                            }}
                          >Delete</button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              {selectedUser && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
                    <button className="absolute top-2 right-2 text-green-700 text-xl" onClick={() => setSelectedUser(null)}>&times;</button>
                    <h3 className="text-lg font-bold mb-2">User Details</h3>
                    <div className="mb-2"><span className="font-semibold">Phone:</span> {selectedUser.phoneNumber}</div>
                    <div className="mb-2"><span className="font-semibold">UID:</span> {selectedUser.uid}</div>
                    <div className="text-green-700">(Add more user info here as needed)</div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="w-full">
          <h2 className="text-lg font-bold mb-2">Notifications</h2>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setNotifLoading(true);
              try {
                // Find user by phone number
                const userDoc = users.find((u) => u.phoneNumber === notifPhone);
                if (!userDoc) throw new Error("User not found for this phone number");
                await addDoc(collection(db, "notifications"), {
                  userId: userDoc.id,
                  message: notifMessage,
                  createdAt: Timestamp.now(),
                });
                toast.success("Notification sent!");
                setNotifMessage("");
                setNotifPhone("");
              } catch (err: unknown) {
                let message = "Failed to send notification";
                if (err instanceof Error) message = err.message;
                toast.error(message);
              } finally {
                setNotifLoading(false);
              }
            }}
            className="flex flex-col sm:flex-row gap-2 mb-4"
          >
            <input
              type="text"
              placeholder="User phone number (e.g. +911234567890)"
              value={notifPhone}
              onChange={e => setNotifPhone(e.target.value)}
              className="border border-green-300 rounded px-3 py-2"
              required
            />
            <input
              type="text"
              placeholder="Notification message"
              value={notifMessage}
              onChange={e => setNotifMessage(e.target.value)}
              className="border border-green-300 rounded px-3 py-2 flex-1"
              required
            />
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded font-semibold hover:bg-green-700 transition disabled:opacity-60"
              disabled={notifLoading}
            >
              {notifLoading ? <span className="animate-spin mr-2">⏳</span> : null} Send
            </button>
          </form>
          {loadingNotifications ? (
            <div className="flex justify-center items-center"><span className="animate-spin text-2xl">⏳</span> Loading notifications...</div>
          ) : notifications.length === 0 ? (
            <div className="text-green-700">No notifications found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border border-green-200 rounded">
                <thead>
                  <tr className="bg-green-100">
                    <th className="px-3 py-2 border">User ID</th>
                    <th className="px-3 py-2 border">Message</th>
                    <th className="px-3 py-2 border">Created At</th>
                    <th className="px-3 py-2 border">Read</th>
                    <th className="px-3 py-2 border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {notifications.map((n) => (
                    <tr key={n.id} className="even:bg-green-50">
                      <td className="px-3 py-2 border text-xs">{n.userId}</td>
                      <td className="px-3 py-2 border">{n.message}</td>
                      <td className="px-3 py-2 border text-xs text-green-700">{n.createdAt.toDate().toLocaleString()}</td>
                      <td className="px-3 py-2 border text-center">
                        <button
                          className={`px-2 py-1 rounded text-xs font-semibold ${n.read ? 'bg-green-200 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}
                          onClick={async () => {
                            try {
                              await updateDoc(doc(db, "notifications", n.id), { read: !n.read });
                              toast.success(n.read ? "Marked as unread" : "Marked as read");
                            } catch {
                              toast.error("Failed to update notification");
                            }
                          }}
                        >
                          {n.read ? "Read" : "Unread"}
                        </button>
                      </td>
                      <td className="px-3 py-2 border text-center">
                        <button
                          className="text-red-600 hover:underline"
                          onClick={async () => {
                            if (!window.confirm("Delete this notification?")) return;
                            try {
                              await deleteDoc(doc(db, "notifications", n.id));
                              toast.success("Notification deleted");
                            } catch {
                              toast.error("Failed to delete notification");
                            }
                          }}
                        >Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 