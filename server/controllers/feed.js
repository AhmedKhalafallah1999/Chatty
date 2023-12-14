import { StatusCodes } from "http-status-codes";
import user from "../models/user.js";
import { verifyToken } from "../utils/jwt.js";
import { UnAuthorizedError } from "../errors/customError.js";
import message from "../models/message.js";
export const AllUsers = async (req, res) => {
  const Users = await user
    .find({})
    .select("userName _id avatarSrc socketId archivedBy");
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
export const archivedUser = async (req, res) => {
  const { userToArchieve, currentUserFullData } = req.body;
  if (!currentUserFullData._id) {
    if (userToArchieve._id !== currentUserFullData) {
      const User = await user.findOneAndUpdate(
        { _id: userToArchieve._id },
        {
          $addToSet: { archivedBy: currentUserFullData },
        }
      );
      return res.status(StatusCodes.OK).json({
        msg: `you have added ${userToArchieve.userName} to the archieve`,
      });
    } else {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        msg: `you have not be able to add your self into archieve`,
      });
    }
  } else {
    if (userToArchieve._id !== currentUserFullData._id) {
      const User = await user.findOneAndUpdate(
        { _id: userToArchieve._id },
        {
          $addToSet: { archivedBy: currentUserFullData._id },
        }
      );
      return res.status(StatusCodes.OK).json({
        msg: `you have added ${userToArchieve.userName} to the archieve`,
      });
    } else {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        msg: `you have not be able to add your self into archieve`,
      });
    }
  }
};
export const UndoArchivedUser = async (req, res) => {
  const { userToArchieve, currentUserFullData } = req.body;
  if (!currentUserFullData._id) {
    if (userToArchieve._id !== currentUserFullData) {
      const User = await user.findOneAndUpdate(
        { _id: userToArchieve._id },
        {
          $pull: { archivedBy: currentUserFullData },
        }
      );
      return res.status(StatusCodes.OK).json({
        msg: `you have undo ${userToArchieve.userName} from the archieve`,
      });
    }
  } else {
    const User = await user.findOneAndUpdate(
      { _id: userToArchieve._id },
      {
        $pull: { archivedBy: currentUserFullData._id },
      }
    );
    return res.status(StatusCodes.OK).json({
      msg: `you have undo  ${userToArchieve.userName} from the archieve`,
    });
  }
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
