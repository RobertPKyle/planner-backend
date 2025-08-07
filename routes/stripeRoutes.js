// routes/stripeRoutes.js
const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post('/create-checkout-session', async (req, res) => {
  const { name, email, phone, reason, start, location } = req.body;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    line_items: [{
      price_data: {
        currency: 'usd',
        product_data: {
          name: `Massage Appointment @ ${location}`,
          description: `50% deposit for ${new Date(start).toLocaleString()}`,
        },
        unit_amount: 0, // 50.00 USD (in cents)
      },
      quantity: 1,
    }],
    customer_email: email,
    success_url: `https://yourfrontend.com/success?start=${start}&name=${name}&email=${email}&phone=${phone}&reason=${reason}`,
    cancel_url: `https://yourfrontend.com/cancel`,
  });

  res.json({ url: session.url });
});

module.exports = router;
