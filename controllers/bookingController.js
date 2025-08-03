const pool = require('../db');

exports.createBooking = async (req, res) => {
  const { name, email, phone, reason, start } = req.body;

  try {
    // Check if this slot is already booked
    const existing = await pool.query(
      'SELECT * FROM bookings WHERE start_time = $1',
      [start]
    );

    if (existing.rows.length > 0) {
      return res.status(409).json({ error: 'Slot already booked' });
    }

    // Create the booking
    await pool.query(
      'INSERT INTO bookings (name, email, phone, reason, start_time) VALUES ($1, $2, $3, $4, $5)',
      [name, email, phone, reason, start]
    );

    res.status(201).json({ message: 'Booking saved' });
  } catch (err) {
    console.error('Booking error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
