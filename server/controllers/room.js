import { StatusCodes } from "http-status-codes";
import room from "../models/room.js";
import { verifyToken } from "../utils/jwt.js";
import { BadRequestError, UnAuthorizedError } from "../errors/customError.js";
import roomMsg from "../models/roomMsg.js";

export const CreateGroup = async (req, res) => {
  const { name, description, groupOwner } = req.body;
  const token = req.cookies["Authorization"];
  if (token) {
    const decoded = verifyToken(token);
    await room.create({
      name: name,
      description: description,
      members: groupOwner,
      admin: [decoded.userId],
    });
    res
      .status(StatusCodes.OK)
      .json({ msg: "You created a new group, start invite your friends" });
  }
  throw new UnAuthorizedError("sorry, session expired");
};
export const FetchAllGroups = async (req, res) => {
  const currentUserId = req.params.userId;
  // const { currentUser } = req.body;
  const rooms = await room.find({ members: currentUserId });
  if (rooms) {
    res.status(StatusCodes.OK).json({ rooms: rooms });
  } else {
    res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: "there is some thing error, in fetching groups" });
  }
};
export const JoinTheRoom = async (req, res) => {
  const roomId = req.params.roomId;
  const token = req.cookies["Authorization"];
  if (token) {
    const decoded = verifyToken(token);
    const userAlreadyMember = await room.findOne({
      members: decoded.userId,
      _id: roomId,
    });
    // console.log(userAlreadyMember);
    if (!userAlreadyMember) {
      await room.findOneAndUpdate(
        { _id: roomId },
        {
          $addToSet: { members: decoded.userId },
        }
      );
      return res
        .status(StatusCodes.OK)
        .json({ msg: "Welcome to, in your  new Group" });
    } else {
      throw new BadRequestError("Already, you have joined before");
    }
  } else {
    throw new UnAuthorizedError("sorry, session expired");
  }
};
export const LeaveTheRoom = async (req, res) => {
  const roomId = req.params.roomId;
  const token = req.cookies["Authorization"];
  if (token) {
    const decoded = verifyToken(token);
    const roomWithAdmin = await room.findOne({
      _id: roomId,
      admin: decoded.userId,
    });
    if (roomWithAdmin) {
      throw new BadRequestError("admins can not leave the group");
    } else {
      await room.findOneAndUpdate(
        { _id: roomId },
        {
          $pull: { members: decoded.userId },
        }
      );
      return res.status(StatusCodes.OK).json({ msg: "you left the group" });
    }
  } else {
    throw new UnAuthorizedError("sorry, session expired");
  }
};
export const previousRoomMsg = async (req, res) => {
  const recieverId = req.params.reciever;
  // console.log(senderId, " ", recieverId);
  const messages = await roomMsg.find({
    reciver: recieverId,
  });
  return res.status(StatusCodes.OK).json({ messages: messages });
  // console.log(messages);
};
