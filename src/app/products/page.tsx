"use client";
import React, { Suspense } from "react";

const ProductList = React.lazy(() => import("@/features/products/ProductList").then(m => ({ default: m.ProductList })));

export default function ProductsPage() {
  return (
    <div style={{ background: '#fff4ea', minHeight: '100vh' }}>
      <Suspense fallback={<div className="flex justify-center items-center min-h-screen">Loading products...</div>}>
        <ProductList />
      </Suspense>
    </div>
  );
}