const express = require('express');
const cors = require('cors');
require('dotenv').config();

const bookingRoutes = require('./routes/bookingRoutes');
const availabilityRoutes = require('./routes/availabilityRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/book', bookingRoutes);
app.use('/availability', availabilityRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const stripeRoutes = require('./routes/stripeRoutes');
app.use('/stripe', stripeRoutes);

app.post('/create-checkout-session', async (req, res) => {
  const { name, email, phone, reason, start, location } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Massage Booking`,
              description: `50% deposit for appointment at ${location}`,
            },
            unit_amount: 0,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      customer_email: email,
      success_url: `https://yourfrontend.com/success?start=${start}&name=${encodeURIComponent(name)}`,
      cancel_url: `https://yourfrontend.com/cancel`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Stripe session error:', error);
    res.status(500).json({ error: 'Failed to create Stripe session' });
  }
});