const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // or require from env
const express = require('express');
const app = express();

app.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          product: 'prod_SpDSiU5U9iFcJX',
          price: 'price_1RtZ1c5J3ekNhzKsVvUBM6bD', // <- use a valid price ID, not 0
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:5173', // or your real frontend URL
      cancel_url: 'http://localhost:5173',
    });

    res.json({ url: session.url }); // <-- THIS is what frontend uses
  } catch (err) {
    console.error('Stripe session error:', err);
    res.status(500).json({ error: 'Stripe session creation failed' });
  }
});
