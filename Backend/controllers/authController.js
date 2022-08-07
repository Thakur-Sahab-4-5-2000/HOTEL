const userSchema = require("../modals/userModel");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config({ path: "./config/config.env" });

const createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const salt = await bcrypt.genSaltSync(10);
  const hash = await bcrypt.hashSync(req.body.password, salt);
  try {
    const user = await new userSchema({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });
    await user.save();
    res.status(200).json("User created successfully");
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const login = async (req, res) => {
  try {
    const user = await userSchema.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send("Enter correct credentials");
    }
    const isMatch = await bcrypt.compareSync(req.body.password, user.password);
    if (!isMatch) {
      return res.status(404).send("Invalid credentials");
    }
    const { password, isAdmin, createdAt, updatedAt, __v, ...otherDetails } =
      user._doc;
    // res.status(200).json({ ...otherDetails });

    //Another Way to send the user details
    // const { _id, username, email } = user;
    // res.status(200).json({ _id, username, email });

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET
    );

    res
      .cookie("token", token, { httpOnly: true })
      .status(200)
      .send({ ...otherDetails ,isAdmin});
  } catch (err) {
    res.status(400).send("Internal Server Error" + err.message);
  }
};

module.exports = { createUser, login };
