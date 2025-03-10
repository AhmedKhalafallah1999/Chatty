import { StatusCodes } from "http-status-codes";
import user from "../models/user.js";
import { options, sendMail } from "../utils/mail.js";
import {
  comparePasswordHandler,
  hashedPasswordHandler,
} from "../utils/hashedPassword.js";
import { GenerateToken } from "../utils/jwt.js";
import crypto from "crypto";
import {
  NotAuthinticationError,
  UnAuthorizedError,
} from "../errors/customError.js";
export const Register = async (req, res, next) => {
  const { userName, email, password, confirmPassword } = req.body;
  const hashedPassword = await hashedPasswordHandler(password);
  const hashedConfirmPassword = await hashedPasswordHandler(confirmPassword);
  const User = await user.create({
    userName: userName,
    email: email,
    password: hashedPassword,
    confirmPassword: hashedConfirmPassword,
  });
  const emailParagraph = `welcome our new visitor`;
  return sendMail(options(email, emailParagraph), (msg) => {
    try {
      return res.json({
        msg: "You recieve a confirmation email to your email" || msg,
      });
    } catch (error) {
      return res.json({ msg: error.msg });
    }
  });
};
export const SetAvatar = async (req, res) => {
  const { email, avatar } = req.body;
  const User = await user.findOne({ email: email });
  if (!User) {
    throw new UnAuthorizedError(
      "You need to register first, before picking a new avatar"
    );
  } else {
    User.avatarIsSet = true;
    User.avatarSrc = avatar;
    await User.save();
    return res
      .status(StatusCodes.OK)
      .json({ msg: "your profile image is updated successfully" });
  }
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
