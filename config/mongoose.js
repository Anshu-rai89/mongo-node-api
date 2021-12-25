const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI);

const db = mongoose.connection;
db.on("error", (error) => console.error("Error connecting to DB", error));
db.once("open", () => console.log("Connected To DB"));

module.exports = db;
