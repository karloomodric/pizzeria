'use client';

import { useCartStore } from '@/store/cartStore';
import { useState } from 'react';
import StripeWrapper from './StripeWrapper';
import CheckoutForm from './CheckoutForm';

export default function CartClient() {
const cart = useCartStore((s) => s.cart);
const removeFromCart = useCartStore((s) => s.removeFromCart);
const clearCart = useCartStore((s) => s.clearCart);

const [showPaymentForm, setShowPaymentForm] = useState(false);
const [showStripe, setShowStripe] = useState(false);

const [name, setName] = useState('');
const [address, setAddress] = useState('');
const [postcode, setPostcode] = useState('');

const handleContinue = () => {
if (!name || !address || !postcode) {
alert('Please fill in all delivery fields');
return;
}
setShowStripe(true);
};

const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

return (
<div className="max-w-4xl mx-auto p-6">
<h1 className="text-3xl font-bold mb-6 text-center">Your Cart</h1>

{cart.length === 0 ? (
<p className="text-gray-600 text-center">Cart is empty</p>
) : (
<>
<ul className="divide-y mb-6">
{cart.map((item) => (
<li key={item.id} className="py-4 flex justify-between items-center">
<div>
<h2 className="text-lg font-semibold">{item.name}</h2>
<p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
<p className="text-sm text-gray-600">
£{(item.price * item.quantity).toFixed(2)}
</p>
</div>
<button
onClick={() => removeFromCart(item.id)}
className="text-red-600 text-sm hover:underline"
>
Remove
</button>
</li>
))}
</ul>

<div className="mb-6 text-right">
<p className="text-xl font-semibold mb-2">Total: £{total.toFixed(2)}</p>
<button
onClick={clearCart}
className="px-4 py-2 border rounded hover:bg-gray-100 text-sm mr-4"
>
Clear Cart
</button>
</div>

{!showPaymentForm ? (
<button
onClick={() => setShowPaymentForm(true)}
className="w-full bg-[#2e2b1f] text-white py-2 rounded hover:opacity-90 transition"
>
Proceed to Checkout
</button>
) : (
<>
<h2 className="text-2xl font-semibold my-4">Delivery Details</h2>
<div className="space-y-4 mb-6">
<input
className="w-full p-2 border"
placeholder="Full Name"
value={name}
onChange={(e) => setName(e.target.value)}
required
/>
<input
className="w-full p-2 border"
placeholder="Address"
value={address}
onChange={(e) => setAddress(e.target.value)}
required
/>
<input
className="w-full p-2 border"
placeholder="Postcode"
value={postcode}
onChange={(e) => setPostcode(e.target.value)}
required
/>

{!showStripe && (
<button
className="w-full bg-black text-white py-2 rounded hover:opacity-90"
onClick={handleContinue}
>
Continue To Payment
</button>
)}
</div>

{showStripe && (
<StripeWrapper
total={total}
name={name}
address={address}
postcode={postcode}
>
<CheckoutForm total={total} />
</StripeWrapper>
)}
</>
)}
</>
)}
</div>
);
}
