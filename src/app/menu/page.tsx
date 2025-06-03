'use client';
import { useCartStore } from '@/store/cartStore';
import { menu } from '@/app/data/menu';
import PizzaCard from '@/components/PizzaCard';

export default function MenuPage() {
const cart = useCartStore((s) => s.cart); // ✅ Zustand live read
const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

return (
<div className="p-6">
<h1 className="text-3xl font-bold mb-4">Menu</h1>

<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
{menu.map((item) => (
<PizzaCard key={item.id} item={item} />
))}
</div>

<div className="bg-gray-100 p-4 rounded shadow">
<h2 className="text-xl font-semibold mb-2">Live Cart (on Menu Page)</h2>
{cart.length === 0 ? (
<p>Cart is empty</p>
) : (
<ul className="mb-2">
{cart.map((item) => (
<li key={item.id}>
{item.name} × {item.quantity}
</li>
))}
</ul>
)}
<p className="font-bold">Total: £{total.toFixed(2)}</p>
</div>
</div>
);
}
