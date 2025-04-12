import express from "express";
import { validate } from "../middlewares/validator.js";
import { loginSchema, signupSchema } from "../utils/schema.js";
import { login, signUp } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", validate(signupSchema), signUp);
router.post("/login", validate(loginSchema), login);

export default router;