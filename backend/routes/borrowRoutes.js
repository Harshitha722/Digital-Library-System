const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');

const {
  issueBook,
  returnBook,
  getBorrowRecords,
  getBorrowHistoryByUser,
  getFinesReport
} = require('../controllers/borrowController');

router.post('/issue', protect, issueBook);
router.post('/', protect, issueBook);
router.put('/return/:id', protect, returnBook);
router.get('/', protect, getBorrowRecords);
router.get('/history/:userId', protect, getBorrowHistoryByUser);
router.get('/fines', protect, authorizeRoles('librarian','admin'), getFinesReport);

module.exports = router;
