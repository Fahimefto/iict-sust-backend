const AuthUser = require("../models/user");
const mongoose = require("mongoose");

//login without jsonwebtoken
const authLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await AuthUser.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.password !== password)
      return res.status(400).json({ message: "Invalid credentials" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//register user
const authRegister = async (req, res) => {
  const { username, fullname, email, password, phoneNum } = req.body;
  try {
    const user = await AuthUser.create({
      username,
      fullname,
      email,
      password,
      phoneNum,
    });
    res.status(200).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//show all users
const getAllUsers = async (req, res) => {
  try {
    const users = await AuthUser.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update user
const updateUserByID = async (req, res) => {
  const { id } = req.params;
  const { fullname, email, password, phoneNum } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ message: "No user with that id" });
  const updatedUser = {
    fullname,
    email,
    password,
    phoneNum,
  };
  await AuthUser.findByIdAndUpdate({ _id: id }, updatedUser, { new: true });
  res.json({ message: "User updated successfully", updatedUser });
};

//delete user by id
const deleteUserByID = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ message: "No user with that id" });
  await AuthUser.findByIdAndRemove({ _id: id });
  res.json({ message: "User deleted successfully" });
};

module.exports = {
  authLogin,
  authRegister,
  getAllUsers,
  updateUserByID,
  deleteUserByID,
};
