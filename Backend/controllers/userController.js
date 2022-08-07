const userSchema = require("../modals/userModel");

const getAllUser = async (req, res) => {
  try {
    const userList = await userSchema.find();
    res.status(200).json(userList);
  } catch (err) {
    res.status(400).send("Internal Sever Error" + err.message);
  }
};

const addNewUser = async (req, res) => {
  const newUser = await new userSchema(req.body);
  try {
    const newUserRes = await newUser.save();
    res.json(newUserRes);
  } catch (err) {
    res.send("Internal Server Error" + err);
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await userSchema.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    res.send("Internal Server Error" + err);
  }
};

const removeUser = async (req, res) => {
  try {
    await userSchema.findByIdAndDelete(req.params.id);
    res.send("user Deleted Successfully");
  } catch (err) {
    res.send("Internal Server Error" + err);
  }
};

module.exports = { getAllUser, addNewUser, updateUser, removeUser };
