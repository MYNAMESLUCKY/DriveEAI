import { db } from '@/services/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { Enquiry } from './types/enquiry';

export const submitEnquiry = async (form: Omit<Enquiry, 'submittedAt'>) => {
  await addDoc(collection(db, 'orderEnquiries'), {
    ...form,
    submittedAt: Timestamp.now(),
  });
};
