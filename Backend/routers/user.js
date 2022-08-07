const express = require("express");
const { verify } = require("jsonwebtoken");
const router = express.Router();
const {
  getAllUser,
  addNewUser,
  updateUser,
  removeUser,
} = require("../controllers/userController");
const {
  verifyToken,
  verifyUser,
  verifyAdmin,
} = require("../utils/verifyToken");

// router.get("/checkAuthentication", verifyToken, (req, res) => {
//   res.send("Authenticated");
// });

// router.get("/checkAdmin", verifyAdmin);

// router.get("/checkUser/:id", verifyUser);

router.get("/", verifyAdmin, getAllUser);

router.put("/updateUser/:id", verifyUser, updateUser);

router.delete("/removeUser/:id", verifyUser, removeUser);

module.exports = router;
