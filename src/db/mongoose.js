// const mongoose = require("mongoose");
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

console.log();

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
