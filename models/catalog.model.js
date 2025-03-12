const mongoose = require("mongoose");

const catalogSchema = new mongoose.Schema(
  {
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      trim: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
      type: Number,
      required: true
    },
    images: [
        {
            imageUrl: String,
            publicId: String
        }
    ],
    stock: {
        type: String,
        default:'unlimited'
    }
  },
  { timestamps: true }
);

const CatalogModel = mongoose.model("Catalog", catalogSchema);
module.exports = CatalogModel;
