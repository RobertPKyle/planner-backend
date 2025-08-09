const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// 1️⃣ Create Checkout Session (does NOT save booking yet)
router.post('/create-checkout-session', async (req, res) => {
  try {
    const { serviceName, servicePrice, bookingData } = req.body;

    // bookingData is an object containing name, email, phone, reason, start, location, etc.
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: serviceName,
            },
            unit_amount: servicePrice * 100, // in cents
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.FRONTEND_URL}/booking-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/booking-cancelled`,
      metadata: {
        ...bookingData, // Store booking details in Stripe so webhook can use it
      },
    });

    res.json({ id: session.id });
  } catch (err) {
    console.error('Error creating checkout session:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
