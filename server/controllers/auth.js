import { StatusCodes } from "http-status-codes";
import user from "../models/user.js";
import {
  comparePasswordHandler,
  hashedPasswordHandler,
} from "../utils/hashedPassword.js";
import { GenerateToken } from "../utils/JWT.js";
import { NotAuthinticationError } from "../errors/customError.js";
export const Register = async (req, res, next) => {
  const { email, password, confirmPassword } = req.body;
  const hashedPassword = await hashedPasswordHandler(password);
  const hashedConfirmPassword = await hashedPasswordHandler(confirmPassword);
  const User = await user.create({
    email: email,
    password: hashedPassword,
    confirmPassword: hashedConfirmPassword,
  });
  return res.json({ msg: "successfully, Registered", User: User });
};
export const Login = async (req, res) => {
  const { email, password } = req.body;
  const User = await user.findOne({ email });
  const isEqual = await comparePasswordHandler(password, User.password);
  if (!isEqual) {
    throw new NotAuthinticationError("Sorry, wrong password");
  } else {
    // JWT based Authintications
    const token = GenerateToken(User);
    // set Headers without using cookie
    res.setHeader("Ahuthorization", `Bearer ${token}`);
    // console.log(req.headers.Ahuthorization);
    return res.status(StatusCodes.OK).json({ msg: "Loggedin, Welcome" });
  }
};
