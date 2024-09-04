const express = require("express");
const dotenv = require("dotenv");
const User = require("../models/userModel"); // Update path if necessary
const bcrypt = require("bcrypt");
const multer = require("multer");
const cloudinary = require("cloudinary");

dotenv.config();

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Signup Route
const signup = async (req, res) => {
    try {
        const { firstName, lastName, userBio, userEmail, userMobile, userName, userPassword } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ userEmail });
        if (existingUser) {
            return res.status(401).send("User already exists with this email");
        }

        // Check if file is provided
        if (!req.file) {
            return res.status(400).json({ error: "No profile image provided" });
        }

        const result = await cloudinary.uploader.upload(req.file.path);
        console.log(result);

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const encryptedPassword = await bcrypt.hash(userPassword, salt);
        console.log("Request Body: ", req.body);

        const newUser = new User({
            firstName,
            lastName,
            userBio,
            userEmail,
            userMobile,
            userName,
            userPassword: encryptedPassword,
            profileImage: result.secure_url
        });

        await newUser.save();

        return res.status(200).json({
            status: "Ok",
            user: {
                userId: newUser._id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                userEmail: newUser.userEmail,
                userName: newUser.userName,
                profileImage: newUser.profileImage
            }
        });

    } catch (error) {
        console.error("Error in signup:", error);
        return res.status(400).json({ error: error.message });
    }
};

// Login Route
const login = async (req, res) => {
    try {
        const { userEmail, userPassword } = req.body;

        const user = await User.findOne({ userEmail });

        if (user) {
            const passwordMatch = await bcrypt.compare(userPassword, user.userPassword);
            if (passwordMatch) {
                return res.json({
                    status: "Ok",
                    user: {
                        userId: user._id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        userEmail: user.userEmail,
                        userName: user.userName,
                        profileImage: user.profileImage
                    }
                });
            } else {
                return res.status(401).json({ status: "Error", message: "Invalid credentials" });
            }
        } else {
            return res.status(404).json({ status: "Error", message: "User not found" });
        }

    } catch (error) {
        console.error("Error in login:", error);
        return res.status(400).json({ error: error.message });
    }
};

// Export the functions
module.exports = { signup, login };
