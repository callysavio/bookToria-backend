import express from "express";
import multer from "multer";
import dotenv from "dotenv";
import { connectDB } from "./db/connection.js";
import userRoutes from "./routes/users.js";
import blogRoutes from "./routes/blogs.js";
import analyticsRoutes from "./routes/analytics/blogs.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRoutes);
app.use("/blogs", blogRoutes);
app.use("/analytics", analyticsRoutes);

app.get("/", function (req, res) {
  res.send("Welcome to Book-toria backend!");
});

// Global error-handling middleware. Must be after all routes.
// Catches multer errors and any error passed via next(error)
app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR HANDLER:", err);

  if (err instanceof multer.MulterError) {
    const messageByCode = {
      LIMIT_FILE_SIZE: "File size exceeds the 2MB limit",
      LIMIT_UNEXPECTED_FILE:
        err.field === "blogImages"
          ? "You can upload a maximum of 5 blog images"
          : "Too many files uploaded or unexpected file field",
    };

    return res.status(400).json({
      statusCode: 400,
      success: false,
      message: messageByCode[err.code] || err.message,
    });
  }

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

const PORT = process.env.PORT;
app.listen(PORT, function () {
  console.log(`Server running at http://localhost:${PORT}`);
  connectDB();
});
