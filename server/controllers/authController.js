import User from "../models/userModel.js";
import { doHash, doHashValidation, hmacProcess } from "../utils/hashing.js";
import jwt from "jsonwebtoken";
import { transport } from "../utils/sendMail.js";
import emailTemplate from "../utils/emailTemplate.js";

export const signUp = async (req, res) => {
  let { username, email, password } = req.body;
  username = username?.toLowerCase();
  email = email?.toLowerCase();
  try {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
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
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Email or username already exists",
      });
    }
    console.log(error);
    res.status(500).json({ error: error.message || "Server error" });
  }
};

export const login = async (req, res) => {
  let { username, password } = req.body;
  username = username?.toLowerCase();

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

export const forgetPassword = async (req, res) => {
  try {
    let { email } = req.body;
    email = email?.toLowerCase();

    if (!email) {
      return res
        .status(401)
        .json({ success: false, message: "Please input your email address" });
    }
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res
        .status(401)
        .json({ success: false, message: "User does not exist!" });
    }

    const codeValue = Math.floor(Math.random() * 1000000).toString();

    const hashedCodeValue = hmacProcess(
      codeValue,
      process.env.HMAC_VERIFICATION_CODE_SECRET
    );

    const resetLink = `https://tickify-seven.vercel.app/auth/reset-password/${hashedCodeValue}`;
    const emailUsername =
      existingUser.username.charAt(0).toUpperCase() +
      existingUser.username.slice(1).toLowerCase();
    let info = await transport.sendMail({
      from: process.env.NODE_CODE_SENDING_EMAIL_ADDRESS,
      to: existingUser.email,
      subject: "Tickify Password Reset",
      html: emailTemplate(emailUsername, resetLink),
    });

    if (info.accepted[0] === existingUser.email) {
      existingUser.forgotPasswordCode = hashedCodeValue;
      existingUser.forgotPasswordCodeValidation = Date.now();
      await existingUser.save();
      return res.status(200).json({
        success: true,
        message: "Reset link sent! Please check your email",
      });
    }
    res.status(400).json({
      success: false,
      message: "Reset password requset failed! Please try again",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password, email } = req.body;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "URL params token required",
      });
    }
    if (!email) {
      return res.status(401).json({
        success: false,
        message: "Email is required",
      });
    }
    if (!password) {
      return res.status(401).json({
        success: false,
        message: "Password and confirmed password required",
      });
    }
    const existingUser = await User.findOne({ email }).select(
      "+forgotPasswordCode +forgotPasswordCodeValidation"
    );

    if (!existingUser) {
      return res
        .status(404)
        .json({ success: false, message: "User does not exist!" });
    }

    if (
      !existingUser.forgotPasswordCode ||
      !existingUser.forgotPasswordCodeValidation
    ) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Something went wrong! Please try again.",
        });
    }

    if (
      Date.now() - existingUser.forgotPasswordCodeValidation >
      10 * 60 * 1000
    ) {
      res
        .status(400)
        .json({ success: false, message: "Verification Code expired" });
    }

    if (token === existingUser.forgotPasswordCode) {
      const hashedPassword = await doHash(password, 12);
      existingUser.password = hashedPassword;
      existingUser.forgotPasswordCode = undefined;
      existingUser.forgotPasswordCodeValidation = undefined;
      await existingUser.save();
      return res
        .status(200)
        .json({ success: true, message: "Password reset successful" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
