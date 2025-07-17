import React from "react";

interface FilterBarProps {
  types: string[];
  type: string;
  setType: (type: string) => void;
  minPrice: number;
  setMinPrice: (price: number) => void;
  maxPrice: number;
  setMaxPrice: (price: number) => void;
}

export default function FilterBar({ types, type, setType, minPrice, setMinPrice, maxPrice, setMaxPrice }: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-6 justify-center items-center bg-white rounded-2xl shadow border border-gray-200 p-0">
      <select
        className="bg-white border border-gray-300 rounded-xl px-5 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-300 text-base min-w-[140px]"
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        {types.map((t) => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>
      <input
        type="number"
        min={0}
        max={maxPrice}
        value={minPrice}
        onChange={(e) => setMinPrice(Number(e.target.value))}
        className="border border-green-300 rounded px-3 py-2 w-24 focus:outline-none focus:ring-2 focus:ring-green-400"
        placeholder="Min Price"
      />
      <input
        type="number"
        min={minPrice}
        max={200}
        value={maxPrice}
        onChange={(e) => setMaxPrice(Number(e.target.value))}
        className="border border-green-300 rounded px-3 py-2 w-24 focus:outline-none focus:ring-2 focus:ring-green-400"
        placeholder="Max Price"
      />
    </div>
  );
}
// Usage: <FilterBar types={...} type={...} setType={...} minPrice={...} setMinPrice={...} maxPrice={...} setMaxPrice={...} /> 