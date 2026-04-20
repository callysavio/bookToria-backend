import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connection.js";

dotenv.config();
//create an instance of express server object:
const app = express();
const PORT = process.env.PORT;
app.get("/", function (req, res) {
  res.send("Welcome to Book-toria backend!");
});
app.listen(PORT, function () {
  console.log(`Server running at http://localhost:${PORT}/`);
  connectDB();
});
