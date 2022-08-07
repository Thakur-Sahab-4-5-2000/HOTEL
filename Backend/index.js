const express = require("express");
const connectDB = require("./mongoDB");
const app = express();
const authrouter = require("./routers/auth");
const hotelrouter = require("./routers/hotels");
const roomsrouter = require("./routers/rooms");
const usersrouter = require("./routers/user");
const cookieParser = require("cookie-parser");
const cors = require("cors");

connectDB();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use("/auth", authrouter);
app.use("/hotels", hotelrouter);
app.use("/rooms", roomsrouter);
app.use("/users", usersrouter);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
