import { StatusCodes } from "http-status-codes";
import room from "../models/room.js";

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
