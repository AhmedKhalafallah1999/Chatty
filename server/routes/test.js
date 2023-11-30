import express from "express";
const router = express.Router();
import { testApp } from "../controllers/test.js";

router.post("/test", testApp);

export default router;
