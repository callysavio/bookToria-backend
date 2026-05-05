import mongoose from "mongoose";

// Define the User schema
const postSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

//Create a Blog model using the schema
const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
