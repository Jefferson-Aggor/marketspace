const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a product name"],
      lowercase: true,
    },
    description: {
      type: String,
      trim: true,
    },
    currency: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    mainPhoto: {
      type: String,
      required: true,
    },
    photo_1: String,
    photo_2: String,
    photo_3: String,
    available_sizes: [
      {
        type: String,
      },
    ],
    quantity: {
      type: Number,
    },
    tags: { type: String, lowercase: true },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "Shop",
    },
    addedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

productSchema.pre("save", function (next) {
  this.price = Number(this.price - 0.01);

  next();
});

productSchema.virtual("orders", {
  ref: "Payment",
  localField: "_id",
  foreignField: "product",
  justOne: false,
});

const product = mongoose.model("Product", productSchema);

module.exports = product;
