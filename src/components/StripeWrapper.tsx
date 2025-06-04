'use client';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

type StripeWrapperProps = {
  children: React.ReactNode;
  total: number;
  name: string;
  address: string;
  postcode: string;
};

export default function StripeWrapper({
  children,
  total,
  name,
  address,
  postcode,
}: StripeWrapperProps) {

  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    const fetchClientSecret = async () => {
      const res = await fetch('/api/create-payment-intent', {
        method: 'POST',
        body: JSON.stringify({ name, address, postcode, total }),
      });

      const data = await res.json();
      setClientSecret(data.clientSecret);
    };

    fetchClientSecret();
  }, [name, address, postcode, total]);

  if (!clientSecret) return <p>Loading payment form...</p>;

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      {children}
    </Elements>
  );
}

