import express from "express";
const router = express.Router();
import { Register, Login } from "../controllers/auth.js";
import {
  ValidateRegisterInputs,
  ValidateLoginInputs,
} from "../middleware/validation.js";

router.post("/register", ValidateRegisterInputs, Register);
router.post("/login", ValidateLoginInputs, Login);

export default router;
