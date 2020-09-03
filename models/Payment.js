const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please enter name"],
    trim: true,
  },
  email: {
    type: String,
    requiredL: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
  },
  phone: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: [true, "Please add location"],
  },
  quantity: {
    type: Number,
    default: 1,
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
  orderedAt: {
    type: Date,
    default: Date.now,
  },
});

const payment = mongoose.model("Payment", paymentSchema);
module.exports = payment;
