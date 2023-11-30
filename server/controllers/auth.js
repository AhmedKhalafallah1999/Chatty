import { BadRequestError } from "../errors/customError.js";

export const Register = (req, res, next) => {
  res.json({ msg: "successfully, Registered", body: req.body });
};
export const Login = (req, res) => {
  res.json({ msg: "Loggedin", body: req.body });
};
