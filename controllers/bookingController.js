const pool = require('../db');

exports.createBooking = async (req, res) => {
  const { name, email, phone, reason, start } = req.body;

  try {
    await pool.query(
      'INSERT INTO bookings (name, email, phone, reason, start_time) VALUES ($1, $2, $3, $4, $5)',
      [name, email, phone, reason, start]
    );

    res.status(201).json({ message: 'Booking saved' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
