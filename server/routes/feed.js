import express from "express";
const router = express.Router();
import {
  AllUsers,
  CurrentUser,
  archivedUser,
  previousMsg,
  previousThreeChats,
  UndoArchivedUser,
} from "../controllers/feed.js";
router.get("/all-users", AllUsers);
router.get("/current-user", CurrentUser);
router.post("/archived-user", archivedUser);
router.post("/undo-archived-user", UndoArchivedUser);

router.get("/previousMsg/:reciever", previousMsg);
router.get("/previousThreeChats", previousThreeChats);

export default router;
