import User from "../models/userModel.js";
import { doHash, doHashValidation } from "../utils/hashing.js";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists!" });
    }
    const hashedPassword = await doHash(password, 12);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ success: true, message: "Signup Successful" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username }).select("+password");
    if (!existingUser) {
      return res
        .status(401)
        .json({ success: false, message: "User does not exist!" });
    }

    const matchPasssword = await doHashValidation(
      password,
      existingUser.password
    );
    if (!matchPasssword) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid password" });
    }
    const token = jwt.sign(
      {
        userId: existingUser._id,
        email: existingUser.email,
        username: existingUser.username,
      },
      process.env.JWT_TOKEN_SECRET,
      { expiresIn: "2d" }
    );

    res.status(200).json({ success: true, message: "Login Successful", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
