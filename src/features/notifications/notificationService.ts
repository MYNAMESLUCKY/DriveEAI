import { collection, query, where, onSnapshot, updateDoc, doc, Firestore } from 'firebase/firestore';
import { Notification } from '@/types/notification';

export const listenToUserNotifications = (
  db: Firestore,
  userId: string,
  onUpdate: (notifications: Notification[]) => void,
  onError?: (error: Error) => void
) => {
  const q = query(collection(db, 'notifications'), where('userId', '==', userId));
  const unsubscribe = onSnapshot(q, (snapshot) => {
    const notifications = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Notification));
    onUpdate(notifications);
  }, (error) => {
    if (onError) onError(error);
  });
  return unsubscribe;
};

export const markNotificationAsRead = async (db: Firestore, notificationId: string) => {
  const notifRef = doc(db, 'notifications', notificationId);
  await updateDoc(notifRef, { read: true });
};
