import express from "express";
const router = express.Router();
import {
  CreateGroup,
  FetchAllGroups,
  JoinTheRoom,
  LeaveTheRoom,
  previousRoomMsg,
} from "../controllers/room.js";
router.post("/create-room", CreateGroup);
router.get("/fetch-all-groups/:userId", FetchAllGroups);
router.post("/join/:roomId", JoinTheRoom);
router.post("/leave/:roomId", LeaveTheRoom);
router.get("/previousRoomMsg/:reciever", previousRoomMsg);

export default router;
