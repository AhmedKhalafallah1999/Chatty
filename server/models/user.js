import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    userName: String,
    email: String,
    password: String,
    confirmPassword: String,
    resetPasswordExpiration: Date,
    resetPasswordToken: String,
    avatarIsSet: Boolean,
    avatarSrc: String,
    socketId: Boolean,
    archivedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);
export default mongoose.model("User", userSchema);
