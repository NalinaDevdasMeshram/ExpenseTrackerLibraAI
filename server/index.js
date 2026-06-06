import express from "express";
const app = express();
import connectDB from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();
console.log(process.env.MONGO_URI);
//connect to the database
connectDB();

app.get("/", (req, res) => {
  res.send("Hello World!!");
  res.end();
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
