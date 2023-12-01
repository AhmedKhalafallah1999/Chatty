import express from "express";
const router = express.Router();
import { testApp } from "../controllers/test.js";
import { authorizedUser } from "../middleware/authorized.js";
router.get("/test", authorizedUser, testApp);

export default router;
