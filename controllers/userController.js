const User = require("../Model/user");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
module.exports.create = async (req, res) => {
  try {
    const user = await User.create(req.body);

    return res.status(201).json({
      success: true,
      data: user.id,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      data: "Server Error",
    });
  }
};

module.exports.login = async (req, res) => {
  try {
    // first search for user in db using email
    const user = await User.findOne({ email: req.body.email });
    // if user is not present so send a message saying to register

    if (!user) {
      return res.status(400).json({
        success: false,
        data: "Please Register ",
      });
    }
    // check if user password is correct

    if (user.password !== req.body.password) {
      return res.status(400).json({
        success: false,
        data: "Invalid Password ",
      });
    }
    // if not through an invalid creds error

    const token = await jwt.sign(
      { email: user.email, name: user.name },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    // if yes then create a jwt token & send it
    return res.status(200).json({
      success: true,
      data: {
        userId: user.id,
        token,
      },
    });
  } catch (err) {
    return res.staus(500).json({
      success: false,
      data: "Server Error",
    });
  }
};
