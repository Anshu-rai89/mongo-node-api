const express = require("express");
const app = express();

const passport = require("./config/passport-jwt");
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept,Authorization "
  );
  next();
});
app.use(express.json());
app.use(passport.initialize());
app.use("/api", require("./routes"));

module.exports = app;
