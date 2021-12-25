const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const passport = require("passport");

const { body } = require("express-validator");
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  [
    body("name").notEmpty().withMessage("Name should be Present"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price should be greater than 0"),
    body("category").notEmpty().withMessage("category should be Present"),
    body("category").notEmpty().withMessage("Category should be Present"),
  ],
  productController.create
);
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  productController.get
);
router.put(
  "/:id/update",
  passport.authenticate("jwt", { session: false }),
  productController.update
);
router.delete(
  "/:id/delete",
  passport.authenticate("jwt", { session: false }),
  productController.delete
);
module.exports = router;
