import User from "../models/userModel.js";
import { doHash, doHashValidation } from "../utils/hashing.js";

export const signUp = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
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
