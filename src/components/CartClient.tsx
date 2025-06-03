'use client';

import { useCartStore } from '@/store/cartStore';
import StripeWrapper from './StripeWrapper';
import CheckoutForm from './CheckoutForm';

export default function CartClient() {
  const cart = useCartStore((s) => s.cart);
  const removeFromCart = useCartStore((s) => s.removeFromCart);
  const clearCart = useCartStore((s) => s.clearCart);

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
                  <p className="text-sm text-gray-600">£{(item.price * item.quantity).toFixed(2)}</p>
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
              className="px-4 py-2 border rounded hover:bg-gray-100 text-sm"
            >
              Clear Cart
            </button>
          </div>

          <h2 className="text-2xl font-semibold mb-4">Checkout</h2>
          <StripeWrapper>
            <CheckoutForm total={total} />
          </StripeWrapper>
        </>
      )}
    </div>
  );
}
