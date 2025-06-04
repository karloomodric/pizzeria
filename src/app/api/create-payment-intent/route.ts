import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import dbConnect from '../../../../lib/mongodb';
import order from '../../../../models/order';
import { useCartStore } from '@/store/cartStore';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-05-28.basil', 
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('Incoming request body: ', body);
    const { name, address, postcode, total, cart } = body;

    await dbConnect();

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(total * 100), 
      currency: 'gbp',
      payment_method_types: ['card'],
      metadata: {
        name,
        address,
        postcode,
      },
    });

    console.log('Saving this order in MongoDB: ', {
      name,
      address,
      postcode,
      total,
      cart,
    });

    const createdOrder = await order.create({
      name,
      address,
      postcode,
      cart,
      total,
    });

    console.log('Saved order in MongoDB: ', createdOrder);

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Payment Intent Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
