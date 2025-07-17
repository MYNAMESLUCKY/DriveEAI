import { Timestamp } from 'firebase/firestore';

export interface Notification {
  id: string;
  userId: string;
  message: string;
  createdAt: Timestamp;
  read?: boolean;
}
