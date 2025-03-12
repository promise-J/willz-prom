const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["airtime", "data", "cable", "electricity", "vendor"],
      required: true,
    },
    amount: { type: Number, required: true, trim: true },
    // description: { type: String, required: true },
    trxref: { type: String, required: true },
    transaction: { type: String, required: true },
    vendor: { type: mongoose.Schema.Types.ObjectId },
    // recipient: { type: String },
    status: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const TransactionModel = mongoose.model("Transaction", transactionSchema);
module.exports = TransactionModel;
