const hotelSchema = require("../modals/hotelModel");
const roomSchema = require("../modals/roomModel");

const getAllHotel = async (req, res) => {
  try {
    const hotelList = await hotelSchema.find();
    res.status(200).json(hotelList);
  } catch (err) {
    res.status(400).send("Internal Sever Error" + err.message);
  }
};

const searchHotel = async (req, res) => {
  const { min, max, ...others } = req.query;
  try {
    const hotels = await hotelSchema
      .find({
        ...others,
        cheapestPrice: { $gte: min || 1, $lte: max || 999 },
      })
      .limit(req.query.limit);
    res.status(200).json(hotels);
  } catch (err) {
    res.send("Internal Server Error: " + err.message);
  }
};

const featuredHotel = async (req, res) => {
  try {
    const hotelList = await hotelSchema.find(req.query).limit(req.query.limit);
    res.status(200).json(hotelList);
  } catch (err) {
    res.status(400).send("Internal Sever Error" + err.message);
  }
};

const addNewHotel = async (req, res) => {
  try {
    const newHotel = await new hotelSchema(req.body);
    const newHotelRes = await newHotel.save();
    res.json(newHotelRes);
  } catch (err) {
    res.send("Internal Server Error" + err);
  }
};

const hotelDetailUpdate = async (req, res) => {
  try {
    const hotel = await hotelSchema.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.json(hotel);
  } catch (err) {
    res.send("Internal Server Error" + err);
  }
};

const removeHotel = async (req, res) => {
  try {
    await hotelSchema.findByIdAndDelete(req.params.id);
    res.send("Hotel Deleted Successfully");
  } catch (err) {
    res.send("Internal Server Error" + err);
  }
};

const getHotel = async (req, res) => {
  try {
    const hotel = await hotelSchema.findById(req.params.id);
    res.json(hotel);
  } catch (err) {
    res.send("Internal Server Error" + err);
  }
};

const getHotelByCity = async (req, res) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return hotelSchema.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    res.status(400).json("Internal Server Error", err);
  }
};

const getHotelByType = async (req, res) => {
  try {
    const hotelCount = await hotelSchema.countDocuments({ type: "hotel" });
    const apartmentCount = await hotelSchema.countDocuments({
      type: "apartment",
    });
    const resortCount = await hotelSchema.countDocuments({ type: "resort" });
    const villaCount = await hotelSchema.countDocuments({ type: "villa" });
    const cabinCount = await hotelSchema.countDocuments({ type: "cabin" });

    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartments", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount },
    ]);
  } catch (err) {
    res.status(400).json("Internal Server Error", err);
  }
};

const getHotelRoom = async (req, res) => {
  try {
    const hotel = await hotelSchema.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map(async (room) => {
        const roomDetail = await roomSchema.findById(room);
        return roomDetail;
      })
    );
    res.status(200).json(list);
  } catch (err) {
    res.status(400).send("Internal Server Error", err);
  }
};

module.exports = {
  getAllHotel,
  addNewHotel,
  hotelDetailUpdate,
  removeHotel,
  getHotel,
  getHotelByCity,
  getHotelByType,
  featuredHotel,
  searchHotel,
  getHotelRoom,
};
