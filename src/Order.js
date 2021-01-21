const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  orderNumber: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  submitted: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Order", orderSchema);
