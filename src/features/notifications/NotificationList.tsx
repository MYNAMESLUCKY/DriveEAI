import React, { useEffect, useState } from 'react';
import { listenToUserNotifications, markNotificationAsRead } from './notificationService';
import { Notification } from '@/types/notification';
import { db } from '@/services/firebase';
import { useAuth } from '../auth/AuthProvider';

export const NotificationList: React.FC = () => {
  const { user, loading } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loadingNotifs, setLoadingNotifs] = useState(true);

  useEffect(() => {
    if (!user) return;
    const unsubscribe = listenToUserNotifications(
      db,
      user.uid,
      (notifs) => {
        setNotifications(notifs);
        setLoadingNotifs(false);
      },
      () => setLoadingNotifs(false)
    );
    return () => unsubscribe();
  }, [user]);

  const handleMarkAsRead = async (id: string) => {
    await markNotificationAsRead(db, id);
  };

  if (loading || loadingNotifs) return <div>Loading notifications...</div>;
  if (!notifications.length) return <div>No notifications found.</div>;

  return (
    <ul className="flex flex-col gap-3">
      {notifications.map((notif) => (
        <li key={notif.id} className={`p-3 rounded border ${notif.read ? 'bg-green-50' : 'bg-white'}`}>
          <div className="font-medium">{notif.message}</div>
          <div className="text-xs text-green-500 mt-1">
            {notif.createdAt.toDate().toLocaleString()}
          </div>
          {!notif.read && (
            <button
              className="ml-4 px-2 py-1 text-xs rounded bg-green-100 hover:bg-green-200 text-green-700 border border-green-300 transition"
              onClick={() => handleMarkAsRead(notif.id)}
            >
              Mark as read
            </button>
          )}
        </li>
      ))}
    </ul>
  );
};
