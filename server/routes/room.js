import express from "express";
const router = express.Router();
import {
  CreateGroup,
  FetchAllGroups,
  JoinTheRoom,
} from "../controllers/room.js";
router.post("/create-room", CreateGroup);
router.get("/fetch-all-groups/:userId", FetchAllGroups);
router.post("/join/:roomId", JoinTheRoom);

export default router;
