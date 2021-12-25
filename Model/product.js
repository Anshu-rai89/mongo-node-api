const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  seller: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["Books", "Electronics", "Clothing"],
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  imgUrl: {
    type: String,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
