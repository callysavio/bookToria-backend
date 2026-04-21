import mongoose from "mongoose";

// Define the User schema
const userSchema = new mongoose.Schema(
  {
    profilePicture: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/128/2202/2202112.png",
    },
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 6,
      maxlength: 20,
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

// Create the User model
const User = mongoose.model("User", userSchema);

export default User;
