const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');

const {
  getFines,
  getUserFines,
  getFineById,
  payFine
} = require('../controllers/fineController');

router.get('/', protect, authorizeRoles('librarian', 'admin'), getFines);
router.get('/user/:id', protect, getUserFines);
router.get('/:id', protect, getFineById);
router.put('/pay/:id', protect, payFine);

module.exports = router;
