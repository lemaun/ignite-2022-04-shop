import { NextApiRequest, NextApiResponse } from "next";
import { Product } from 'use-shopping-cart/core'
import { stripe } from "../../lib/stripe";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // const { priceId } = req.body

  const { products } = req.body as { products: Product[] }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed.'})
  }

  // if (!priceId) {
  //   return res.status(400).json({ error: 'Price not found.'})
  // }

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_URL}`,
    mode: 'payment',
    line_items: products.map((product) => ({
      price: product.defaultPriceId,
      quantity: 1,
    })),
  })

  return res.status(201).json({
    checkoutUrl: checkoutSession.url,
  })
}