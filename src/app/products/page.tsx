"use client";
import React, { Suspense } from "react";

const ProductList = React.lazy(() => import("@/features/products/ProductList").then(m => ({ default: m.ProductList })));

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen">Loading products...</div>}>
      <ProductList />
    </Suspense>
  );
}