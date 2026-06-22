const mongoose = require("mongoose");

const fineSchema = new mongoose.Schema(
  {
    borrowId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BorrowRecord",
      required: true
    },
    amount: {
      type: Number,
      required: true,
      min: 0
    },
    status: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending"
    },
    paidDate: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Fine", fineSchema);
