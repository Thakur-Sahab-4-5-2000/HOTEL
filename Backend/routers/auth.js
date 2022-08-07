const express = require("express");
const { createUser, login } = require("../controllers/authController");
const router = express.Router();
const { body } = require("express-validator");

router.post(
  "/register",
  [
    body("email").isEmail(),
    body("username").isLength({ min: 5 }),
    body("password").isLength({ min: 5 }),
  ],
  createUser
);

router.post("/login", login);
module.exports = router;
