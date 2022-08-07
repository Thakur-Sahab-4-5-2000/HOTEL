const express = require("express");
const router = express.Router();
const {
  getAllHotel,
  addNewHotel,
  hotelDetailUpdate,
  removeHotel,
  getHotel,
  getHotelByCity,
  getHotelByType,
  featuredHotel,
  searchHotel,
  getHotelRoom
} = require("../controllers/hotelController");
const { verifyAdmin } = require("../utils/verifyToken");

router.get("/", getAllHotel);

router.get("/find/:id", getHotel);

router.post("/addnewHotel", verifyAdmin, addNewHotel);

router.put("/update/:id", verifyAdmin, hotelDetailUpdate);

router.delete("/delete/:id", verifyAdmin, removeHotel);

router.get("/countByCity", getHotelByCity);
router.get("/countByType", getHotelByType);
router.get("/featured", featuredHotel);
router.get("/search", searchHotel);
router.get("/room/:id", getHotelRoom);

module.exports = router;
