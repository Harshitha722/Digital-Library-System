const BorrowRecord = require('../models/BorrowRecord');
const Book = require('../models/Book');
const Fine = require('../models/Fine');

const updateOverdueStatuses = async () => {
  const now = new Date();
  await BorrowRecord.updateMany(
    {
      dueDate: { $lt: now },
      status: 'active'
    },
    { status: 'overdue' }
  );
};

exports.issueBook = async (req, res) => {
  try {
    const { bookId, dueDays, userId: requestedUserId } = req.body;
    let userId = req.user._id;

    if (requestedUserId && ['librarian', 'admin'].includes(req.user.role)) {
      userId = requestedUserId;
    }

    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    if (book.availableCopies < 1) {
      return res.status(400).json({ message: 'No copies available' });
    }

    const issueDate = new Date();
    const dueDate = new Date(issueDate.getTime() + ((dueDays || 14) * 24 * 60 * 60 * 1000));

    const record = await BorrowRecord.create({
      userId,
      bookId,
      issueDate,
      dueDate,
      status: 'active'
    });

    await Book.findByIdAndUpdate(bookId, { $inc: { availableCopies: -1 } });

    res.status(201).json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.returnBook = async (req, res) => {
  try {
    const id = req.params.id;

    const record = await BorrowRecord.findById(id);

    if (!record) {
      return res.status(404).json({ message: 'Borrow record not found' });
    }

    if (record.status === 'returned') {
      return res.status(400).json({ message: 'Already returned' });
    }

    if (req.user) {
      const role = req.user.role;
      if (!['librarian', 'admin'].includes(role) && String(req.user._id) !== String(record.userId)) {
        return res.status(403).json({ message: 'Access Denied' });
      }
    }

    const returnDate = new Date();
    let fine = 0;
    const finePerDay = parseFloat(process.env.FINE_PER_DAY) || 1;

    if (record.dueDate && returnDate > record.dueDate) {
      const daysLate = Math.ceil((returnDate - record.dueDate) / (1000 * 60 * 60 * 24));
      fine = daysLate * finePerDay;
    }

    record.returnDate = returnDate;
    record.fine = fine;
    record.status = 'returned';

    await record.save();

    if (fine > 0) {
      await Fine.create({
        borrowId: record._id,
        amount: fine,
        status: 'pending'
      });
    }

    await Book.findByIdAndUpdate(record.bookId, { $inc: { availableCopies: 1 } });

    res.json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBorrowRecords = async (req, res) => {
  try {
    await updateOverdueStatuses();

    const query = {};

    if (req.query.status) query.status = req.query.status;

    if (req.query.userId) {
      if (['librarian', 'admin'].includes(req.user.role) || String(req.user._id) === String(req.query.userId)) {
        query.userId = req.query.userId;
      } else {
        return res.status(403).json({ message: 'Access Denied' });
      }
    } else if (['student', 'teacher'].includes(req.user.role)) {
      query.userId = req.user._id;
    }

    const records = await BorrowRecord.find(query)
      .populate('bookId', 'title author availableCopies')
      .populate('userId', 'name email role');

    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBorrowHistoryByUser = async (req, res) => {
  try {
    await updateOverdueStatuses();

    const userId = req.params.userId;

    if (req.user) {
      const role = req.user.role;
      if (!['librarian', 'admin'].includes(role) && String(req.user._id) !== String(userId)) {
        return res.status(403).json({ message: 'Access Denied' });
      }
    }

    const query = { userId };
    if (req.query.status && req.query.status !== 'all') {
      query.status = req.query.status;
    }

    const records = await BorrowRecord.find(query)
      .populate('bookId', 'title author availableCopies')
      .populate('userId', 'name email role');

    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getFinesReport = async (req, res) => {
  try {
    const fines = await BorrowRecord.aggregate([
      { $match: { fine: { $gt: 0 } } },
      { $group: { _id: '$userId', totalFine: { $sum: '$fine' }, count: { $sum: 1 } } },
      { $lookup: { from: 'users', localField: '_id', foreignField: '_id', as: 'user' } },
      { $unwind: { path: '$user', preserveNullAndEmptyArrays: true } },
      { $project: { userId: '$_id', totalFine: 1, count: 1, name: '$user.name', email: '$user.email' } }
    ]);

    res.json(fines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
