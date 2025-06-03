'use client';

import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

type Props = {
  total: number;
};

export default function CheckoutForm({ total }: Props) {
  const stripe = useStripe();
  const elements = useElements();

  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [postcode, setPostcode] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (!stripe || !elements) {
      setMessage('Stripe has not loaded yet.');
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setMessage('Card element not found.');
      setLoading(false);
      return;
    }

    const res = await fetch('/api/create-payment-intent', {
      method: 'POST',
      body: JSON.stringify({
        name: fullName,
        address,
        postcode,
        total,
      }),
    });

    const { clientSecret } = await res.json();

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: fullName,
          address: {
            line1: address,
            postal_code: postcode,
          },
        },
      },
    });

    if (result.error) {
      setMessage(result.error.message || 'Payment failed');
    } else {
      if (result.paymentIntent?.status === 'succeeded') {
        setMessage('Payment successful!');
      } else {
        setMessage('Payment processing...');
      }
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow-md">
      <input
        type="text"
        placeholder="Full name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />
      <input
        type="text"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />
      <input
        type="text"
        placeholder="Postcode"
        value={postcode}
        onChange={(e) => setPostcode(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />
      <CardElement className="border p-4 rounded" />
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#2e2b1f] text-white py-2 rounded hover:opacity-90 transition"
      >
        {loading ? 'Processing...' : `Pay £${total.toFixed(2)}`}
      </button>
      {message && <p className="text-center mt-4 text-sm text-red-600">{message}</p>}
    </form>
  );
}
