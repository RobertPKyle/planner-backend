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
    const result = await pool.query('SELECT * FROM availability');
    res.json(
      result.rows.map((row) => ({
        start: row.start_time,
        end: row.end_time,
        location: row.location,
      }))
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

