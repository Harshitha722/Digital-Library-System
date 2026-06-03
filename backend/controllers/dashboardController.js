const User =
require("../models/User");

const Book =
require("../models/Book");

const Category =
require("../models/Category");

const BorrowRecord =
require("../models/BorrowRecord");

exports.getStats =
async(req,res)=>{

    const totalUsers =
    await User.countDocuments();

    const totalStudents =
    await User.countDocuments({
        role:"student"
    });

    const totalTeachers =
    await User.countDocuments({
        role:"teacher"
    });

    const totalBooks =
    await Book.countDocuments();

    const totalCategories =
    await Category.countDocuments();

    const issuedBooks =
    await BorrowRecord.countDocuments({
        status:"issued"
    });

    res.json({
        totalUsers,
        totalStudents,
        totalTeachers,
        totalBooks,
        totalCategories,
        issuedBooks
    });
};