// models/user.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    profilePicture: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/128/2202/2202112.png",
    },
    profilePicturePublicId: {
      type: String,
      default: "",
    },
    username: {
      encryptedData: { type: String, required: true },
      iv: { type: String, required: true },
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);
export default User;
