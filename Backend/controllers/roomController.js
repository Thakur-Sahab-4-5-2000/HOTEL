const roomSchema = require("../modals/roomModel");
const hotelSchema = require("../modals/hotelModel");

const createRoom = async (req, res) => {
  try {
    const hotelId = req.params.hotelId;
    const newRoom = new roomSchema(req.body);
    const newRoomRes = await newRoom.save();

    try {
      await hotelSchema.findByIdAndUpdate(hotelId, {
        $push: { rooms: newRoomRes._id },
      });
    } catch (err) {
      res.status(404).send("Internal Server Error " + err.message);
    }
    res.status(200).json(newRoomRes);
  } catch (err) {
    res.status(404).send("Internal Server Error " + err.message);
  }
};

const updateRoom = async (req, res) => {
  try {
    const res = await roomSchema.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(res);
  } catch (err) {
    res.status(404).send("Internal Server Error " + err.message);
  }
};

const deleteRoom = async (req, res) => {
  try {
    await roomSchema.findByIdAndDelete(req.params.id);
    try {
      const hotelId = req.params.hotelId;
      await hotelSchema.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id },
      });
    } catch (err) {
      res.status(404).send("Internal Server Error " + err.message);
    }
    res.status(200).send("Room Deleted Successfully");
  } catch (err) {
    res.status(404).send("Internal Server Error " + err.message);
  }
};

const getRooms = async (req, res) => {
  try {
    const rooms = await roomSchema.find();
    res.status(200).json(rooms);
  } catch {
    res.status(404).send("Internal Server Error " + err.message);
  }
};

const updateRoomAvailability = async (req, res, next) => {
  try {
    await roomSchema.updateOne(
      { "roomNumbers._id": req.params.id },
      {
        $push: {
          "roomNumbers.$.unavailableDates": req.body.dates,
        },
      }
    );
    res.status(200).json("Room status has been updated.");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createRoom,
  updateRoom,
  deleteRoom,
  getRooms,
  updateRoomAvailability,
};
