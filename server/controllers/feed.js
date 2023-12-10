import { StatusCodes } from "http-status-codes";
import user from "../models/user.js";
import { verifyToken } from "../utils/jwt.js";
import { UnAuthorizedError } from "../errors/customError.js";
import message from "../models/message.js";
import { Types } from "mongoose";
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
export const previousMsg = async (req, res) => {
  const token = req.cookies["Authorization"];
  if (token) {
    const { userId } = verifyToken(token);
    const recieverId = req.params.reciever;
    const senderId = userId;
    // console.log(senderId, " ", recieverId);
    const messages = await message.find({
      $or: [
        {
          sender: senderId,
          reciver: recieverId,
        },
        {
          sender: recieverId,
          reciver: senderId,
        },
      ],
    });
    return res
      .status(StatusCodes.OK)
      .json({ messages: messages });
    // console.log(messages);
  }
  throw new UnAuthorizedError("sorry, faild to load past messages");
};
