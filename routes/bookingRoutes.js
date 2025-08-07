const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // or require from env


router.post('/create-checkout-session', async (req, res) => {
  const { name, email, phone, reason, start } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Massage Appointment`,
              description: `With ${name} - ${new Date(start).toLocaleString()}`,
            },
            unit_amount: 0, // 50% upfront ($50)
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `youtube.com`,
      cancel_url: `facebook.com`,
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error('Stripe session error:', err);
    res.status(500).json({ error: 'Stripe session failed' });
  }
});

module.exports = router;
