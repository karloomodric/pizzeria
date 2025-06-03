import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MenuItem } from '@/types/MenuItem';

type CartItem = MenuItem & { quantity: number };

type CartStore = {
cart: CartItem[];
addToCart: (item: MenuItem) => void;
removeFromCart: (id: number) => void;
clearCart: () => void;
};

export const useCartStore = create<CartStore>()(
persist(
(set, get) => ({
cart: [],
addToCart: (item) => {
const cart = get().cart;
const existing = cart.find((i) => i.id === item.id);
if (existing) {
set({
cart: cart.map((i) =>
i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
),
});
} else {
set({
cart: [...cart, { ...item, quantity: 1 }],
});
}
},
removeFromCart: (id) => {
set({
cart: get().cart.filter((i) => i.id !== id),
});
},
clearCart: () => {
set({ cart: [] });
},
}),
{
name: 'pizzeria-cart-storage', // 🧠 localStorage key
}
)
);
