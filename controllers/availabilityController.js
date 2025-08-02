const pool = require('../db');

exports.createAvailability = async (req, res) => {
  const { start, end } = req.body;

  try {
    await pool.query(
      'INSERT INTO availability (start_time, end_time) VALUES ($1, $2)',
      [start, end]
    );
    res.status(201).json({ message: 'Availability added' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.getAvailability = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM availability');
    res.json(
      result.rows.map((row) => ({
        start: row.start_time,
        end: row.end_time,
      }))
    );
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
