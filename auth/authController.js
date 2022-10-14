const AuthUser = require("../models/user");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//login user
const authLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await AuthUser.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        } else {
            const isValid = await bcrypt.compare(password, user.password);
            if (isValid) {
                const token = jwt.sign(
                    {
                        user_info: {
                            id: user._id,
                            role : user.role
                        },
                    },
                    process.env.JWT_MAGIC,
                    {
                        expiresIn: "12h",
                    }
                );
                res.status(200).json({
                    message: "Login Success",
                    auth: true,
                    token,
                });
            } else {
                res.status(400).json({ message: "Invalid credentials" });
            }
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//register user
const authRegister = async (req, res) => {
    const { username, fullname, email, password, phoneNum,role} = req.body;
    try {
        if (!username || !fullname || !email || !password || !phoneNum)
            return res
                .status(400)
                .json({ message: "Please fill in all fields" });
        const user = await AuthUser.findOne({ email });
        if (user)
            return res.status(400).json({ message: "user already exists" });
        const hashedPassword = await bcrypt.hash(password, 9);
        const newUser = await AuthUser.create({
            username,
            fullname,
            email,
            password: hashedPassword,
            phoneNum,
            role,
        });
        res.status(200).json(newUser);
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
    const { fullname, email, password, phoneNum,role} = req.body;
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({ message: "No user with that id" });
    const updatedUser = {
        fullname,
        email,
        password,
        phoneNum,
        role,
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
