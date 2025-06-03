'use client';

import { MenuItem } from '@/types/MenuItem';
import { useCartStore } from '@/store/cartStore';

type Props = {
  item: MenuItem;
};

export default function PizzaCard({ item }: Props) {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className="border border-[#2e2b1f] rounded-md p-6 bg-white shadow-sm hover:shadow-md transition">
      <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
      <p className="text-sm text-gray-700 mb-4">{item.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-lg font-medium">£{item.price.toFixed(2)}</span>
        <button
          onClick={() => addToCart(item)}
          className="px-4 py-1 border border-[#2e2b1f] hover:bg-[#2e2b1f] hover:text-white transition text-sm"
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
}
