import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog } from '@headlessui/react';
import { toast } from 'react-hot-toast';
import { ShoppingCartIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { Product } from './types/product';
import { getProducts } from './productService';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import SectionTitle from '@/components/ui/SectionTitle';
import FilterBar from '@/components/ui/FilterBar';

// Quick View Modal
const QuickViewModal = ({ product, open, onClose, onEnquire }: {
  product: Product | null;
  open: boolean;
  onClose: () => void;
  onEnquire: () => void;
}) => (
  <AnimatePresence>
    {open && product && (
      <Dialog as="div" className="fixed inset-0 z-50 flex items-center justify-center" open={open} onClose={onClose} static>
        <motion.div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
        <div className="fixed inset-0 flex items-center justify-center">
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 32 }}
          >
            <Dialog.Panel
              className="relative max-w-md w-full bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 flex flex-col items-center border border-white/30"
            >
              <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-800 focus:outline-none"
              aria-label="Close quick view"
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="w-48 h-48 rounded-xl overflow-hidden mb-4 shadow-lg bg-white/50 flex items-center justify-center">
              <Image src={product.image} alt={product.name} width={192} height={192} className="object-cover w-full h-full" />
            </div>
            <Dialog.Title className="text-2xl font-bold text-gray-900 mb-1 text-center">{product.name}</Dialog.Title>
            <div className="text-base text-green-700 mb-2">{product.type}</div>
            <div className="text-xl font-semibold text-gray-900 mb-1">₹{product.price} <span className="text-base font-normal text-gray-500">/quintal</span></div>
            <div className="text-sm text-gray-500 mb-4">Min Order: {product.minOrder} quintals</div>
            <Button
              className="w-full py-3 text-lg font-semibold rounded-lg bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-green-600 focus:ring-2 focus:ring-green-400"
              onClick={onEnquire}
              aria-label={`Enquire about ${product.name}`}
            >
              <ShoppingCartIcon className="w-5 h-5 mr-2" /> Enquire
            </Button>
          </Dialog.Panel>
        </motion.div>
      </div>
    </Dialog>
    )}
  </AnimatePresence>
);


// Skeleton Loader Component
const ProductCardSkeleton = () => (
  <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 animate-pulse">
    <div className="aspect-square bg-gray-200" />
    <div className="p-4 space-y-3">
      <div className="h-5 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-100 rounded w-1/2" />
      <div className="flex justify-between items-center pt-2">
        <div className="h-6 bg-gray-200 rounded w-1/3" />
        <div className="h-8 bg-gray-200 rounded-lg w-20" />
      </div>
    </div>
  </div>
);

// Empty State Component
const EmptyState = ({ onResetFilters }: { onResetFilters: () => void }) => (
  <div className="text-center py-12">
    <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M20 7l-8-4.5L4 7m16 0l-8 4.5M4 7v10l8 4.5M20 7v10l-8 4.5"
        />
      </svg>
    </div>
    <h3 className="text-lg font-medium text-gray-900 mb-1">No products found</h3>
    <p className="text-gray-500 mb-4">
      We couldn&apos;t find any products matching your filters.
    </p>
    <Button
      onClick={onResetFilters}
      variant="secondary"
      className="inline-flex items-center gap-1.5"
    >
      <ArrowPathIcon className="w-4 h-4" />
      Reset filters
    </Button>
  </div>
);

// Product Card Component
import clsx from "clsx";
const ProductCard = ({ 
  product,
  onEnquire,
  onQuickView
}: { 
  product: Product;
  onEnquire: () => void;
  onQuickView: () => void;
}) => (
  <motion.div
    whileHover={{ y: -6, scale: 1.03 }}
    whileTap={{ scale: 0.98 }}
    className={clsx(
      "group bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden border border-white/30 transition-all duration-300",
      "hover:shadow-2xl hover:bg-white/90 focus-within:shadow-2xl"
    )}
    tabIndex={0}
    aria-label={`Product: ${product.name}`}
  >
    <div className="relative aspect-square overflow-hidden">
      <Image
        src={product.image}
        alt={product.name}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-300"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
    <div className="p-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-gray-900 text-lg">{product.name}</h3>
          <p className="text-sm text-gray-500">{product.type}</p>
        </div>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          {product.minOrder} quintals min
        </span>
      </div>
      <div className="mt-3 flex items-center justify-between gap-2">
        <span className="text-xl font-bold text-gray-900">
          ₹{product.price}
          <span className="text-sm font-normal text-gray-500">/quintal</span>
        </span>
        <div className="flex gap-2">
          <Button
            onClick={onEnquire}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg bg-green-600 text-white hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            <ShoppingCartIcon className="w-4 h-4" />
            Enquire
          </Button>
          <Button
            onClick={onQuickView}
            variant="secondary"
            className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-lg border border-green-200 bg-white/70 text-green-700 hover:bg-green-50 focus:ring-2 focus:ring-green-500"
            aria-label={`Quick view ${product.name}`}
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4" /><path d="M2 12C4.5 7 9 4 12 4s7.5 3 10 8c-2.5 5-7 8-10 8s-7.5-3-10-8z" /></svg>
            Quick View
          </Button>
        </div>
      </div>
    </div>
  </motion.div>
);


// Pagination Component
const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  className 
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className={`flex items-center justify-center ${className}`}>
      <ul className="inline-flex items-center -space-x-px">
        <li>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="sr-only">Previous</span>
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </li>
        {pages.map((page) => (
          <li key={page}>
            <button
              onClick={() => onPageChange(page)}
              className={`px-3 py-2 leading-tight ${
                currentPage === page
                  ? 'z-10 text-green-600 border border-green-300 bg-green-50'
                  : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'
              }`}
            >
              {page}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="sr-only">Next</span>
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [type, setType] = useState('All');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(200);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    getProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  const riceTypes = ['All', ...Array.from(new Set(products.map((p) => p.type)))];
  const filteredProducts = products.filter((p) =>
    (type === 'All' || p.type === type) &&
    p.price >= minPrice &&
    p.price <= maxPrice
  );

  // Pagination state
  const PRODUCTS_PER_PAGE = 6;
  const [page, setPage] = useState(1);
  const pageCount = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * PRODUCTS_PER_PAGE,
    page * PRODUCTS_PER_PAGE
  );

  // Quick View modal state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isQuickViewOpen, setQuickViewOpen] = useState(false);

  // Reset page if filters change
  useEffect(() => { setPage(1); }, [type, minPrice, maxPrice]);

  // Enquiry handler with toast
  const handleEnquire = (product?: Product) => {
    toast.success(
      <span>
        <span className="font-semibold">Enquiry sent!</span><br />
        We&apos;ll contact you soon about <span className="text-green-700 font-medium">{(product || selectedProduct)?.name}</span>.
      </span>,
      { icon: '✅', duration: 3500 }
    );
    setQuickViewOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 mb-12 text-white">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold mb-4">Premium Quality Rice</h1>
          <p className="text-lg mb-6 opacity-90">
            Discover our handpicked selection of the finest rice varieties, sourced directly from trusted farmers.
          </p>
          <Button
            href="#products"
            className="bg-white text-green-700 hover:bg-gray-100 px-6 py-3 text-lg font-medium"
          >
            Shop Now
          </Button>
        </div>
      </div>

      <div id="products" className="mb-16">
        <SectionTitle subtitle="Our Premium Selection">
          Featured Products
        </SectionTitle>

        {/* Filter Bar */}
        <div className="mb-8 bg-white rounded-xl shadow-sm p-4">
          <FilterBar
            types={riceTypes}
            type={type}
            setType={setType}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
          />
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <EmptyState onResetFilters={() => {
            setType('All');
            setMinPrice(0);
            setMaxPrice(200);
          }} />
        ) : (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {paginatedProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onEnquire={() => handleEnquire(product)}
                  onQuickView={() => { setSelectedProduct(product); setQuickViewOpen(true); }}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Quick View Modal */}
        <QuickViewModal
          product={selectedProduct}
          open={isQuickViewOpen}
          onClose={() => setQuickViewOpen(false)}
          onEnquire={() => handleEnquire()}
        />

        {/* Pagination */}
        {!loading && pageCount > 1 && (
          <Pagination
            currentPage={page}
            totalPages={pageCount}
            onPageChange={setPage}
            className="mt-12"
          />
        )}
      </div>
    </div>
  );
};
