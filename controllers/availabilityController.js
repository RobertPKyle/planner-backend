const pool = require('../db');

exports.createAvailability = async (req, res) => {
  const { start, end, location } = req.body;

  try {
    await pool.query(
      'INSERT INTO availability (start_time, end_time, location) VALUES ($1, $2, $3)',
      [start, end, location]
    );
    res.status(201).json({ message: 'Availability added' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getAvailability = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT a.*
      FROM availability a
      LEFT JOIN bookings b ON a.start_time = b.start_time
      WHERE b.start_time IS NULL
    `);

    res.json(
      result.rows.map((row) => ({
        start: row.start_time,
        end: row.end_time,
        location: row.location,
      }))
    );
  } catch (err) {
    console.error('getAvailability failed:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};
