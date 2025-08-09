// app.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

const app = express();

app.use(cors({
  origin: [FRONTEND_URL, 'http://localhost:5173'],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false
}));

app.use(express.json());

// Routes
const availabilityRoutes = require('./routes/availabilityRoutes');
const stripeRoutes = require('./routes/stripeRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

app.use('/availability', availabilityRoutes);
app.use('/stripe', stripeRoutes);

// Mount booking routes under /book so your frontend can call /book/create-checkout-session
app.use('/book', bookingRoutes);

// Simple health check
app.get('/', (req, res) => res.send('Planner backend is running'));

// Start server (AFTER routes and middleware)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
