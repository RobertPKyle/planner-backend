const express = require('express');
const cors = require('cors');
require('dotenv').config();

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// Easiest for dev:
app.use(cors({
  origin: [FRONTEND_URL, 'http://localhost:5173'],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false
}));

const app = express();
app.use(express.json());

const availabilityRoutes = require('./routes/availabilityRoutes');

app.use('/availability', availabilityRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const stripeRoutes = require('./routes/stripeRoutes');
app.use('/stripe', stripeRoutes);

const bookingRoutes = require('./routes/bookingRoutes');
app.use('/', bookingRoutes);