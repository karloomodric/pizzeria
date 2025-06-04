'use client';

import dynamic from "next/dynamic";
const CartClient = dynamic(() => import('@/components/CartClient'))

export default function CartPage() {
  return(
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Your cart</h1>
      <CartClient />
    </div>
  );
}
