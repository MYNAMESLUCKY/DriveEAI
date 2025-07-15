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
    <div className="flex flex-wrap gap-4 justify-center mb-8">
      <select
        className="border border-green-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
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