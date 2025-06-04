'use client';

import { useEffect, useState } from 'react';
import {
useStripe,
useElements,
PaymentElement,
PaymentRequestButtonElement,
} from '@stripe/react-stripe-js';
import type { PaymentRequest } from '@stripe/stripe-js';
import { useCartStore } from '@/store/cartStore';

export default function CheckoutForm({ total }: { total: number }) {
const stripe = useStripe();
const elements = useElements();
const [paymentRequest, setPaymentRequest] = useState<PaymentRequest | null>(null);
const [canUsePaymentRequest, setCanUsePaymentRequest] = useState(false);

// New controlled state for form inputs
const [name, setName] = useState('');
const [address, setAddress] = useState('');
const [postcode, setPostcode] = useState('');

useEffect(() => {
if (!stripe) return;

const pr = stripe.paymentRequest({
country: 'GB',
currency: 'gbp',
total: {
label: 'Total',
amount: Math.round(total * 100),
},
requestPayerName: true,
requestPayerEmail: true,
});

pr.canMakePayment().then((result) => {
if (result) {
setPaymentRequest(pr);
setCanUsePaymentRequest(true);
}
});
}, [stripe, total]);

const handleSubmit = async (e: React.FormEvent) => {
e.preventDefault();
if (!stripe || !elements) return;

const cartItems = useCartStore.getState().cart;
console.log('cart items', cartItems);


const res = await fetch('/api/create-payment-intent', {
method: 'POST',
headers: {
'Content-Type': 'application/json',
},
body: JSON.stringify({
total,
name,
address,
postcode,
cart: cartItems,
}),
});

const { clientSecret } = await res.json();

if (!clientSecret) {
console.error('Missing client secret');
return;
}

const result = await stripe.confirmPayment({
elements,
confirmParams: {
return_url: 'https://pizzeria-five-sable.vercel.app/success',
},
});

if (result.error) {
console.error(result.error.message);
}
};

return (
<div className="space-y-6">
{canUsePaymentRequest && paymentRequest && (
<PaymentRequestButtonElement options={{ paymentRequest }} />
)}

<form onSubmit={handleSubmit} className="space-y-4">

<PaymentElement />

<button
type="submit"
className="w-full bg-[#2e2b1f] text-white py-2 rounded hover:opacity-90 transition"
>
Pay £{total.toFixed(2)}
</button>
</form>
</div>
);
}
