'use client';

import StripeWrapper from '@/components/StripeWrapper';
import CheckoutForm from '@/components/CheckoutForm';
import { useCartStore } from '@/store/cartStore';

export default function CartPage() {
  const cart = useCartStore((s) => s.cart);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // You can later pull this from a form, but hardcoding for now:
  const name = 'Karlo Modric';
  const address = 'Flat 4, 22 Charnwood Street';
  const postcode = 'DE1 2GU';

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Cart</h1>
      <StripeWrapper total={total} name={name} address={address} postcode={postcode}>
        <CheckoutForm total={total} />
      </StripeWrapper>
    </div>
  );
}
