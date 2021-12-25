const express = require("express");
const router = express.Router();
const userController = (ler = require("../controllers/userController"));

router.post("/register", userController.create);

router.post("/login", userController.login);

module.exports = router;
