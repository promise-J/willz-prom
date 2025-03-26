const mongoose = require("mongoose");

const referralSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      trim: true
    },
    refferedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      trim: true
    }
  },
  { timestamps: true }
);

const ReferralModel = mongoose.model("Referral", referralSchema);
module.exports = ReferralModel;
