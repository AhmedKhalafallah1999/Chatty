import mongoose from "mongoose";
const RoomMessageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  reciver: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Room",
  },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model("RoomMessage", RoomMessageSchema);
