import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/connection.js";
import userRoutes from "./routes/users.js";
dotenv.config();
//create an instance of express server object:
const app = express();
app.use(express.json());

//use the user routes for handling user-related requests
app.use("/users", userRoutes);
const PORT = process.env.PORT;
app.get("/", function (req, res) {
  res.send("Welcome to Book-toria backend!");
});
app.listen(PORT, function () {
  console.log(`Server running at http://localhost:${PORT}`);
  //call the connectDB function to connect to MongoDB
  connectDB();
});
