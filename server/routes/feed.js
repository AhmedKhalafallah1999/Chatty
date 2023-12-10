import express from "express";
const router = express.Router();
import { AllUsers, CurrentUser, previousMsg } from "../controllers/feed.js";
router.get("/all-users", AllUsers);
router.get("/current-user", CurrentUser);
router.get("/previousMsg/:reciever", previousMsg);

export default router;
