import { StatusCodes } from "http-status-codes";
import user from "../models/user.js";
import { verifyToken } from "../utils/jwt.js";
import { UnAuthorizedError } from "../errors/customError.js";
import message from "../models/message.js";
export const AllUsers = async (req, res) => {
  const Users = await user.find({}).select("userName _id avatarSrc socketId");
  // console.log(Users);
  res.status(StatusCodes.OK).json(Users);
};
export const CurrentUser = async (req, res) => {
  const token = req.cookies["Authorization"];
  if (token) {
    const decoded = verifyToken(token);
    const User = await user.findOne({ _id: decoded.userId });
    return res
      .status(StatusCodes.OK)
      .json({ currentUserId: decoded, currentUser: User });
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
    return res.status(StatusCodes.OK).json({ messages: messages });
    // console.log(messages);
  }
  throw new UnAuthorizedError("sorry, faild to load past messages");
};
export const previousThreeChats = async (req, res) => {
  const token = req.cookies["Authorization"];
  if (token) {
    const { userId } = verifyToken(token);
    const senderId = userId;
    // console.log(senderId, " ", recieverId);
    const messages = await message
      .find({
        $or: [
          {
            sender: senderId,
          },
          // {
          //   reciver: senderId,
          // },
        ],
      })
      .limit(3);
    return res.status(StatusCodes.OK).json({ messages: messages });
    // console.log(messages);
  }
  throw new UnAuthorizedError("sorry, faild to load past messages");
};
