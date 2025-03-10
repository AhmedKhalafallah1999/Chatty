import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    members: [
      {
        ref: "User",
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
    admin: [
      {
        ref: "User",
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
    profileImage: String,
  },
  { tiestamps: true }
);

export default mongoose.model("Room", RoomSchema);
