const AuthUser = require('../models/user');
const RefreshToken = require('../models/refreshToken');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
    signAccessToken,
    signRefreshToken,
} = require('../middleware/token_generator');

//login user
const authLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await AuthUser.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        } else {
            const isValid = await bcrypt.compare(password, user.password);
            if (isValid) {
                const accessToken = await signAccessToken(user._id, user.role);
                const refreshToken = await signRefreshToken(
                    user._id,
                    user.role
                );

                await RefreshToken.create({
                    token: refreshToken,
                });
                res.cookie('refreshToken', refreshToken, {httponly: true});
                res.cookie('accessToken', accessToken, {httponly: true});
                

                res.status(200).json({
                    message: 'cookie set successfully',
                    auth: true,
                    accessToken,
                    refreshToken,
                });
            } else {
                res.status(400).json({ message: 'Invalid credentials' });
            }
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//register user
const authRegister = async (req, res) => {
    const { username, fullname, email, password, phoneNum, role } = req.body;
    try {
        if (!username || !fullname || !email || !password || !phoneNum)
            return res
                .status(400)
                .json({ message: 'Please fill in all fields' });
        const user = await AuthUser.findOne({ email });
        if (user)
            return res.status(400).json({ message: 'user already exists' });
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
        if (req.role === 'staff') {
            const users = await AuthUser.find();
            res.status(200).json(users);
        } else {
            res.status(403).json({ message: 'You are not authorized' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//update user
const updateUserByID = async (req, res) => {
    const { id } = req.params;
    const { fullname, email, password, phoneNum, role } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({ message: 'No user with that id' });
    const updatedUser = {
        fullname,
        email,
        password,
        phoneNum,
        role,
    };
    await AuthUser.findByIdAndUpdate({ _id: id }, updatedUser, { new: true });
    res.json({ message: 'User updated successfully', updatedUser });
};

//delete user by id
const deleteUserByID = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({ message: 'No user with that id' });
    await AuthUser.findByIdAndRemove({ _id: id });
    res.json({ message: 'User deleted successfully' });
};

const refreshToken = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.status(401).json({ message: 'No token provided' });
    } else {
        const validtoken = await RefreshToken.findOne({ token: refreshToken });
        if (!validtoken) {
            return res.status(403).json({ message: 'Invalid token' });
        } else {
            jwt.verify(
                refreshToken,
                process.env.JWT_MAGIC_REFRESH,
                async (err, decode) => {
                    if (err)
                        return res.status(403).json({
                            message: 'Invalid token',
                        });
                    const user_id = decode.user_info.id;
                    const user_role = decode.user_info.role;

                    const accToken = await signAccessToken(user_id, user_role);
                    const refToken = await signRefreshToken(user_id, user_role);
                    await RefreshToken.replaceOne(validtoken, {
                        token: refToken,
                    });
                    res.cookie('accessToken', accToken, {httponly: true});
                    res.cookie('refreshToken', refToken, {httponly: true});
                    res.status(200).json({
                        message: 'Token refreshed',
                        accessToken: accToken,
                        refreshToken: refToken,
                    });
                }
            );
        }
    }
};

module.exports = {
    authLogin,
    authRegister,
    getAllUsers,
    updateUserByID,
    deleteUserByID,
    refreshToken,
};
