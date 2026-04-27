import mongoose from "mongoose";

// Define the Blog schema
const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    category: {
      type: String,
      enum: ["technology", "lifestyle", "travel", "food", "education"],
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      //   required: true,
    },
  },
  {
    timestamps: true,
  },
);
// Create the Blog model
const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
