import express from "express";
const router = express.Router();
import {
  CreateGroup,
  FetchAllGroups,
  JoinTheRoom,
  LeaveTheRoom,
  previousRoomMsg,
  // changeProfilePicture,
} from "../controllers/room.js";
import upload from "../middleware/multer.js";
import room from "../models/room.js";
router.post("/create-room", CreateGroup);
router.get("/fetch-all-groups/:userId", FetchAllGroups);
router.post("/join/:roomId", JoinTheRoom);
router.post("/leave/:roomId", LeaveTheRoom);
router.get("/previousRoomMsg/:reciever", previousRoomMsg);
router.post(
  "/change-profile-picture",
  upload.single("profilePicture"),
  async (req, res) => {
    // Access the uploaded file via req.file
    const uploadedFileName = req.file.filename;
    const roomId = req.body.roomId;
    await room.findOneAndUpdate(
      { _id: roomId },
      {
        profileImage: `${uploadedFileName}`,
      }
    );
    // Your logic to handle the uploaded file, e.g., save the file name in the database
    // and send a response back to the client
    res.json({ message: "File uploaded successfully", uploadedFileName });
  }
);

export default router;
