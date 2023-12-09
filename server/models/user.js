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
  },
  { timestamps: true }
);
export default mongoose.model("User", userSchema);
