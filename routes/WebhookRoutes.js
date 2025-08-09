const bodyParser = require('body-parser');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { createBooking } = require('./controllers/bookingController'); // Your existing DB insert

// Stripe webhook endpoint
app.post(
  '/webhook',
  bodyParser.raw({ type: 'application/json' }), // Stripe needs raw body
  async (req, res) => {
    const sig = req.headers['stripe-signature'];

    let event;
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error('Webhook signature verification failed:', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // If payment succeeded, save booking
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;

      // bookingData is what we passed into metadata earlier
      const bookingData = {
        name: session.metadata.name,
        email: session.metadata.email,
        phone: session.metadata.phone,
        reason: session.metadata.reason,
        start: session.metadata.start,
        location: session.metadata.location,
      };

      try {
        await createBooking(bookingData); // Insert into DB
        console.log('✅ Booking confirmed:', bookingData);
      } catch (dbErr) {
        console.error('DB save error:', dbErr);
      }
    }

    res.status(200).json({ received: true });
  }
);
