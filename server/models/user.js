import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    email: String,
    password: String,
    confirmPassword: String,
  },
  { timestamps: true }
);
export default mongoose.model("User", userSchema);
