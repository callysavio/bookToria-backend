import mongoose from "mongoose";

// Define the Blog schema
const blogSchema = new mongoose.Schema(
  {
    blogImage: {
      type: String,
      default: "",
    },
    blogImagePublicId: {
      type: String,
      default: "",
    },
    blogImages: [
      {
        url: {
          type: String,
          default: "",
        },
        public_id: {
          type: String,
          default: "",
        },
      },
    ],
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
      default: "published",
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
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
// Create the Blog model
const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
