const express = require("express");
const router = express.Router();
router.get("/", (req, res) => res.json("Hello world"));
router.use("/product", require("./product"));
router.use("/user", require("./user"));

module.exports = router;
