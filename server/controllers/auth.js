import { StatusCodes } from "http-status-codes";
import user from "../models/user.js";
import { options, sendMail } from "../utils/mail.js";
import {
  comparePasswordHandler,
  hashedPasswordHandler,
} from "../utils/hashedPassword.js";
import { GenerateToken } from "../utils/JWT.js";
import crypto from "crypto";
import { NotAuthinticationError } from "../errors/customError.js";
import { log } from "console";
import { cookie } from "express-validator";
export const Register = async (req, res, next) => {
  const { email, password, confirmPassword } = req.body;
  const hashedPassword = await hashedPasswordHandler(password);
  const hashedConfirmPassword = await hashedPasswordHandler(confirmPassword);
  const User = await user.create({
    email: email,
    password: hashedPassword,
    confirmPassword: hashedConfirmPassword,
  });
  const emailParagraph = `welcome our new visitor`;
  return sendMail(options(email, emailParagraph), (msg) => {
    try {
      return res.json({
        msg: "You recieve a confirmation email to your email",
      });
    } catch (error) {
      return res.json({ msg: error.msg });
    }
  });
};
export const Login = async (req, res) => {
  const { email, password } = req.body;
  const User = await user.findOne({ email });
  const isEqual = await comparePasswordHandler(password, User.password);
  try {
    if (!isEqual) {
      throw new NotAuthinticationError("Sorry, wrong password");
    } else {
      // JWT based Authintications
      const token = GenerateToken(User);
      res.cookie("Authorization", token, {
        expire: 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      // set Headers without using cookie
      // res.setHeader("Ahuthorization", `Bearer ${token}`);
      // i will use JWT with a cookie

      // console.log(req.headers.Ahuthorization);
      return res.status(StatusCodes.OK).json({ msg: "Loggedin, Welcome" });
    }
  } catch (err) {
    // throw new NotAuthinticationError("Sorry, wrong password");
    return res.status(err.StatusCodes).json({ msg: err.message });
  }
};

export const Reset = async (req, res) => {
  const { email } = req.body;
  const resetPasswordToken = crypto.randomBytes(32).toString("hex");
  const resetPasswordExpiration = new Date(Date.now() + 60 * 60 * 1000);
  const User = await user.findOne({ email: email });
  User.resetPasswordToken = resetPasswordToken;
  User.resetPasswordExpiration = resetPasswordExpiration;
  await User.save();
  const emailParagraph = `We sent a link to your email, click on it before an hour http://localhost:5173/reset-password/${resetPasswordToken}`;
  return sendMail(options(email, emailParagraph), (msg) => {
    try {
      return res.json({
        msg: "We sent an email to your email with a confirmation link",
      });
    } catch (error) {
      return res.json({ msg: error.msg });
    }
  });
};
export const ResetNewPassword = async (req, res) => {
  const { password } = req.body;
  const hashedPassword = await hashedPasswordHandler(password);
  const User = await user.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpiration: { $gt: Date.now() },
  });
  try {
    if (User) {
      User.password = hashedPassword;
      User.resetPasswordToken = undefined;
      User.resetPasswordExpiration = undefined;
      await User.save();
      return res.json({ msg: "password updated successfully" });
    } else {
      throw new NotAuthinticationError("sorry, the link is expired");
    }
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ msg: error.message });
  }
  // const User =
};
export const Logout = (req, res) => {
  res.clearCookie("Authorization");
  res.status(StatusCodes.OK).json({ msg: "logout" });
};
