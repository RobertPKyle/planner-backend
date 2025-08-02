const express = require('express');
const router = express.Router();
const {
  createAvailability,
  getAvailability,
} = require('../controllers/availabilityController');

router.post('/', createAvailability);
router.get('/', getAvailability);

module.exports = router;
