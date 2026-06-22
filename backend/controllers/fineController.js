const Fine = require('../models/Fine');
const BorrowRecord = require('../models/BorrowRecord');

const buildFineResponse = (fine) => {
  const borrow = fine.borrowId;
  const overdueDays = borrow?.returnDate && borrow?.dueDate
    ? Math.max(0, Math.ceil((new Date(borrow.returnDate) - new Date(borrow.dueDate)) / (1000 * 60 * 60 * 24)))
    : 0;

  return {
    _id: fine._id,
    amount: fine.amount,
    status: fine.status,
    paidDate: fine.paidDate,
    createdAt: fine.createdAt,
    updatedAt: fine.updatedAt,
    overdueDays,
    borrow: borrow ? {
      _id: borrow._id,
      issueDate: borrow.issueDate,
      dueDate: borrow.dueDate,
      returnDate: borrow.returnDate,
      book: borrow.bookId,
      user: borrow.userId
    } : null
  };
};

exports.getFines = async (req, res) => {
  try {
    if (!['admin', 'librarian'].includes(req.user.role)) {
      return res.status(403).json({ message: 'Access Denied' });
    }

    const fines = await Fine.find()
      .populate({
        path: 'borrowId',
        populate: [
          { path: 'bookId', select: 'title author' },
          { path: 'userId', select: 'name email role' }
        ]
      });

    res.json(fines.map(buildFineResponse));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserFines = async (req, res) => {
  try {
    const userId = req.params.id;

    if (['student', 'teacher'].includes(req.user.role) && String(req.user._id) !== String(userId)) {
      return res.status(403).json({ message: 'Access Denied' });
    }

    const fines = await Fine.find()
      .populate({
        path: 'borrowId',
        populate: [
          { path: 'bookId', select: 'title author' },
          { path: 'userId', select: 'name email role' }
        ]
      });

    const filtered = fines.filter((fine) => fine.borrowId?.userId && String(fine.borrowId.userId._id) === String(userId));
    res.json(filtered.map(buildFineResponse));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getFineById = async (req, res) => {
  try {
    const fine = await Fine.findById(req.params.id)
      .populate({
        path: 'borrowId',
        populate: [
          { path: 'bookId', select: 'title author' },
          { path: 'userId', select: 'name email role' }
        ]
      });

    if (!fine) {
      return res.status(404).json({ message: 'Fine not found' });
    }

    const borrow = fine.borrowId;
    if (['student', 'teacher'].includes(req.user.role) && String(req.user._id) !== String(borrow.userId._id)) {
      return res.status(403).json({ message: 'Access Denied' });
    }

    res.json(buildFineResponse(fine));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.payFine = async (req, res) => {
  try {
    const fine = await Fine.findById(req.params.id).populate({
      path: 'borrowId',
      populate: [
        { path: 'userId', select: 'name email role' }
      ]
    });

    if (!fine) {
      return res.status(404).json({ message: 'Fine not found' });
    }

    const borrow = fine.borrowId;
    if (['student', 'teacher'].includes(req.user.role) && String(req.user._id) !== String(borrow.userId._id)) {
      return res.status(403).json({ message: 'Access Denied' });
    }

    if (fine.status === 'paid') {
      return res.status(400).json({ message: 'Fine already paid' });
    }

    fine.status = 'paid';
    fine.paidDate = new Date();

    await fine.save();

    res.json(buildFineResponse(fine));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
