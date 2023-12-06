import express from "express";
const router = express.Router();
import {
  Register,
  Login,
  Reset,
  ResetNewPassword,
  Logout,
} from "../controllers/auth.js";
import {
  ValidateRegisterInputs,
  ValidateLoginInputs,
  ValidateResetInputs,
  ValidateNewPasswordInputs,
} from "../middleware/validation.js";
import { authorizedUser } from "../middleware/authorized.js";

router.post("/register", ValidateRegisterInputs, Register);
router.get("/logout", authorizedUser, Logout);
router.post("/login", ValidateLoginInputs, Login);
router.post("/resetPassword", ValidateResetInputs, Reset);
router.post(
  "/resetPassword/:token",
  ValidateNewPasswordInputs,
  ResetNewPassword
);
export default router;
