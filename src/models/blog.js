import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true,
    },
    content:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    image:{
        type: String,
        default: "https://share.google/7SKnzrCmlvUXzI1NC"
    },
    categories:{
        type: String,
        required: true,
        emun:["Tech", "Business", "Education", "Health"]
    },
    createdAt: {
  type: Date,
  default: Date.now
   }
})
const blog = mongoose.model("blog", blogSchema);
export default blog