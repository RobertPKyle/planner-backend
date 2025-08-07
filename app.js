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

const bookingRoutes = require('./routes/bookingRoutes');
app.use('/', bookingRoutes);