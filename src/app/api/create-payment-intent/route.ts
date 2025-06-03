import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-05-28.basil', 
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, address, postcode, total } = body;

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

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Payment Intent Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
