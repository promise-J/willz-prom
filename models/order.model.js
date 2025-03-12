const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
        type: String,
        default: 'pending',
        enum: ['success', 'failed', 'pending', 'completed']
    },
    totalAmount: {
        type: Number,
        required: true
    },
    description: { type: String, required: true },
    orderDetails: [{
        productId: {type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
        quantity: {type: Number, required: true},
        price: {type: Number, required: true}
    }],
    amount: { type: Number, required: true, trim: true },
    trxref: { type: String, required: true },
    transaction: { type: String, required: true },
    vendor: { type: mongoose.Schema.Types.ObjectId, ref:'User', required: true},
    status: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },
    toBeDelivered: {type: String, default: 'YES', required: true},
    deliveryFee: {type: Number, default: 0},
    address: {
        state: String,
        landmark: String,
        lga: String,
    },
    qrCode: {
        type: String
    },
    pickupCode: {
        type: String
    }
  },
  { timestamps: true }
);

const OrderModel = mongoose.model("Order", orderSchema);
module.exports = OrderModel;
