const express = require("express");
const router = express.Router();
const {
  createRoom,
  updateRoom,
  deleteRoom,
  getRooms,
  updateRoomAvailability,
} = require("../controllers/roomController");
const { verifyAdmin } = require("../utils/verifyToken");

router.get("/", getRooms);

router.post("/createRoom/:hotelId", verifyAdmin, createRoom);

router.delete("/deleteRoom/:id/:hotelId", verifyAdmin, deleteRoom);

router.put("/updateRoom/:hotelId", verifyAdmin, updateRoom);

router.put("/availability/:id", updateRoomAvailability);

module.exports = router;
