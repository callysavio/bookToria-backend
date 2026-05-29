import mongoose from "mongoose";

// Define the User schema
const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        content: {
            type: String,
            ref: "User",
            required: true,
        },
        status: {
            type: String,
            enum: ["draft", "published"],
            default: "published",
       },
        category: {
            type: String,
            enum: ["Technology", "Lifestyle", "Travel", "Food", "Education"],
            required: true,
        },
        tags: {
            type: [String],
            default: [],
        },
        blogImages: {
            type: [String],
            default: [],
        },
        blogImagePublicIds: {
            type: [String],
            default: [],
        },
    },
    { timestamps: true },
);
 
const Blog = mongoose.model("Blog", blogSchema);

export default Blog; 

