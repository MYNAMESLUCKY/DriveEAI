export interface Enquiry {
  name: string;
  contact: string;
  riceType: string;
  quantity: string;
  location: string;
  submittedAt: Date | import('firebase/firestore').Timestamp;
}
