"use client";
import { useState } from "react";
import Image from "next/image";
import FilterBar from "@/components/ui/FilterBar";
import Button from "@/components/ui/Button";
import SectionTitle from "@/components/ui/SectionTitle";
import StatCard from "@/components/ui/StatCard";

// Placeholder rice product data. Replace with real data or fetch from backend.
const riceProducts = [
  {
    id: 1,
    name: "Basmati Rice",
    type: "Basmati",
    price: 80,
    minOrder: 25,
    image: "/rice1.jpg", // Place rice1.jpg in /public
  },
  {
    id: 2,
    name: "Sona Masoori",
    type: "Sona Masoori",
    price: 60,
    minOrder: 50,
    image: "/rice2.jpg",
  },
  {
    id: 3,
    name: "Parboiled Rice",
    type: "Parboiled",
    price: 55,
    minOrder: 50,
    image: "/rice3.jpg",
  },
  {
    id: 4,
    name: "Brown Rice",
    type: "Brown",
    price: 90,
    minOrder: 25,
    image: "/rice4.jpg",
  },
  // Add more products as needed
];

const riceTypes = [
  "All",
  ...Array.from(new Set(riceProducts.map((p) => p.type))),
];

export default function ProductsPage() {
  const [type, setType] = useState("All");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100);

  const filtered = riceProducts.filter((p) => {
    const typeMatch = type === "All" || p.type === type;
    const priceMatch = p.price >= minPrice && p.price <= maxPrice;
    return typeMatch && priceMatch;
  });

  return (
    <div className="min-h-screen bg-white text-green-900 py-8 px-4">
      <SectionTitle subtitle="Premium rice varieties for every need">Our Rice Varieties</SectionTitle>
      {/* Filter Bar */}
      <FilterBar
        types={riceTypes}
        type={type}
        setType={setType}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
      />
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {filtered.length === 0 && (
          <div className="col-span-full text-center text-green-700">No products found for selected filter.</div>
        )}
        {filtered.map((product) => (
          <div key={product.id} className="bg-green-50 rounded-lg shadow p-4 flex flex-col items-center">
            <Image
              src={product.image}
              alt={product.name}
              width={180}
              height={120}
              className="rounded mb-3 object-cover"
            />
            <h2 className="text-xl font-semibold mb-1">{product.name}</h2>
            <div className="text-green-700 mb-1">Type: {product.type}</div>
            <div className="mb-1">Price: <span className="font-bold">₹{product.price}</span> / kg</div>
            <div className="mb-2 text-sm text-green-600">Min Order: {product.minOrder} kg</div>
            <Button variant="primary" fullWidth>Enquire</Button>
          </div>
        ))}
      </div>
      {/* Stats Section (optional) */}
      <div className="flex flex-wrap justify-center gap-8 mt-12">
        <StatCard value="20+" label="Rice Varieties" />
        <StatCard value="500+" label="Happy Clients" />
        <StatCard value="10+" label="Years of Service" />
      </div>
    </div>
  );
}
// Customization: Replace riceProducts array and images with your real product data and images in /public. 