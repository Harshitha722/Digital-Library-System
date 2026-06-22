const mongoose = require("mongoose");

const borrowRecordSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true
    },
    issueDate: {
      type: Date,
      default: Date.now
    },
    dueDate: {
      type: Date
    },
    returnDate: {
      type: Date
    },
    fine: {
      type: Number,
      default: 0
    },
    status: {
      type: String,
      enum: ["active", "returned", "overdue"],
      default: "active"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("BorrowRecord", borrowRecordSchema);