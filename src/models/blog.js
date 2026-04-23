import mongoose from "mongoose";


const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 200,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80",
    },
    category: {
      type: String,
      required: true,
      trim: true,
      default: "general",
    },
    tags: {
      type: [String],
      default: [],
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
