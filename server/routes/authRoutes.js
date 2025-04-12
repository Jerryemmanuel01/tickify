import express from "express";
import { validate } from "../middlewares/validator.js";
import { signupSchema } from "../utils/schema.js";
import { signUp } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", validate(signupSchema), signUp);

export default router;