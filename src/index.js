import express from "express";
import multer from "multer";
import dotenv from "dotenv";
import { connectDB } from "./db/connection.js";
import userRoutes from "./routes/users.js";
import blogRoutes from "./routes/blogs.js";

dotenv.config();

const app = express();
app.use(express.json());
const PORT = process.env.PORT;
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRoutes);
app.use("/blogs", blogRoutes);

app.get("/", function (req, res) {
  res.send("Welcome to Book-toria backend!");
});

// ✅ Global error-handling middleware — MUST be after all routes
// Catches multer errors and any error passed via next(error)
app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR HANDLER:", err);

  // Handle multer-specific errors (file size, unexpected field, etc.)
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      statusCode: 400,
      success: false,
      message:
        err.code === "LIMIT_FILE_SIZE"
          ? "File size exceeds the 2MB limit"
          : err.message,
    });
  }

  // Handle custom errors thrown from fileFilter (e.g., wrong file type)
  if (err) {
    return res.status(err.status || 500).json({
      statusCode: err.status || 500,
      success: false,
      message:
        typeof err.message === "string"
          ? err.message
          : JSON.stringify(err.message) || "An unexpected error occurred",
    });
  }

  next();
});

app.listen(PORT, function () {
  console.log(`Server running at http://localhost:${PORT}`);
  connectDB();
});
