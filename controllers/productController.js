const Product = require("../Model/product");
const { validationResult } = require("express-validator");
const redis = require("redis");
const util = require("util");
let client;
(async () => {
  client = redis.createClient();

  client.on("error", (err) => console.log("Redis Client Error", err));

  await client.connect();

  await client.set("test", "geyee");
  const value = await client.get("test");
  console.log("value", value);
})();

module.exports.create = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const products = await Product.create(req.body);
    const cahcedProducts = JSON.parse(await client.get("products"));
    console.log("cagche in create", cahcedProducts);
    if (cahcedProducts) {
      cahcedProducts.push(products);
      await client.set("products", JSON.stringify(cahcedProducts), "EX", 1);
    }
    return res.status(201).json({ success: true, data: products });
  } catch (error) {
    return res.status(500).json({ success: false, data: "Server Error" });
  }
};

module.exports.get = async (req, res) => {
  try {
    let { pageNo } = req.query;
    console.log("pageNo", pageNo);
    pageNo = pageNo ? pageNo : 1;
    const pageSize = 2;
    const skipData = (pageNo - 1) * 2;
    console.log("skip", skipData);

    // we will get the products from our memory first

    const cahchedProducts = JSON.parse(await client.get("products"));
    console.log("cahched product");

    if (cahchedProducts) {
      console.log("Got it from cached");
      return res.status(200).json({ success: true, data: cahchedProducts });
    }
    // accessing data from our memory takes no time
    const products = await Product.find({}).sort({ price: -1 });
    console.log(" got it from db products");

    await client.set("products", JSON.stringify(products), "EX", 1);
    // why not store this products in our local memory
    return res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log("error ", error);
    return res.status(500).json({ success: false, data: "Server Error" });
  }
};

module.exports.update = async (req, res) => {
  try {
    const products = await Product.findByIdAndUpdate(req.params.id, {
      price: req.body.price,
    });
    return res.status(200).json({ success: true, data: products });
  } catch (error) {
    return res.status(500).json({ success: false, data: "Server Error" });
  }
};

module.exports.delete = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(400).json({ success: false, data: "Bad Input" });
    }
    const products = await Product.findByIdAndDelete(req.params.id, {
      price: req.body.price,
    });
    return res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log("Error deleting product", error);
    return res.status(500).json({ success: false, data: "Server Error" });
  }
};
