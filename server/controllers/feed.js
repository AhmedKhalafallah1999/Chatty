import { StatusCodes } from "http-status-codes";
import user from "../models/user.js";
import { verifyToken } from "../utils/jwt.js";
import { UnAuthorizedError } from "../errors/customError.js";
export const AllUsers = async (req, res) => {
  const Users = await user.find({}).select("userName _id avatarSrc");
  res.status(StatusCodes.OK).json(Users);
};
export const CurrentUser = async (req, res) => {
  const token = req.cookies["Authorization"];
  if (token) {
    const decoded = verifyToken(token);
    return res.status(StatusCodes.OK).json({ currentUserId: decoded });
  }
  throw new UnAuthorizedError("sorry, session expired");

  // console.log(token);
};
