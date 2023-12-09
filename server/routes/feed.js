import express from "express";
const router = express.Router();
import { AllUsers, CurrentUser } from "../controllers/feed.js";
router.get("/all-users", AllUsers);
router.get("/current-user", CurrentUser);

export default router;
