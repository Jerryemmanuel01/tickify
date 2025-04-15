import express from "express";
import { validate } from "../middlewares/validator.js";
import { forgetPasswordSchema, loginSchema, signupSchema } from "../utils/schema.js";
import { forgetPassword, login, signUp } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", validate(signupSchema), signUp);
router.post("/login", validate(loginSchema), login);
router.post("/forget-password", validate(forgetPasswordSchema), forgetPassword);

export default router;