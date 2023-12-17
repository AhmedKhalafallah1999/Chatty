import { StatusCodes } from "http-status-codes";
import room from "../models/room.js";
import { verifyToken } from "../utils/jwt.js";
import { BadRequestError } from "../errors/customError.js";
export const CreateGroup = async (req, res) => {
  const { name, description, groupOwner } = req.body;
  const createdRoom = await room.create({
    name: name,
    description: description,
    members: groupOwner,
  });
  res
    .status(StatusCodes.OK)
    .json({ msg: "You created a new group, start invite your friends" });
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
    const userAlreadyMember = await room.findOne({ members: decoded.userId });
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
