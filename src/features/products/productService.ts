import { Product } from './types/product';

// Placeholder for fetching products, replace with Firestore logic as needed
export const getProducts = async (): Promise<Product[]> => {
  return [
    {
      id: 1,
      name: 'Basmati Rice',
      type: 'Basmati',
      price: 80,
      minOrder: 25,
      image: '/rice1.jpg',
    },
    {
      id: 2,
      name: 'Sona Masoori',
      type: 'Sona Masoori',
      price: 60,
      minOrder: 50,
      image: '/rice2.jpg',
    },
    {
      id: 3,
      name: 'Parboiled Rice',
      type: 'Parboiled',
      price: 55,
      minOrder: 50,
      image: '/rice3.jpg',
    },
    {
      id: 4,
      name: 'Brown Rice',
      type: 'Brown',
      price: 90,
      minOrder: 25,
      image: '/rice4.jpg',
    },
  ];
};
