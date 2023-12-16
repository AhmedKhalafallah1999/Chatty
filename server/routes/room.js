import express from "express";
const router = express.Router();
import { CreateGroup, FetchAllGroups } from "../controllers/room.js";
router.post("/create-room", CreateGroup);
router.get("/fetch-all-groups/:userId", FetchAllGroups);

export default router;
