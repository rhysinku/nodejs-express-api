// Import Required
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRoute from "./Routes/user.route.js";
import authRoute from "./Routes/auth.route.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

// Declare Required
const app = express();

// Use Required

dotenv.config();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Mongo Url
const mongoUrl =
  "mongodb+srv://rhysindodev:eOR1HJsCqGsWzVO7@cluster0.mqk2f9r.mongodb.net/mern-auth?retryWrites=true&w=majority&appName=Cluster0";

// Import Model
// require("./Model/userDetails");

// Declare Model
// const User = mongoose.model("UserDetails");

// Monggo Connection
mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("Mongo Connected From Server");
  })
  .catch((e) => console.log(e));

// Express Listen if Running
app.listen(1234, () => {
  console.log("Server is started: Port: 1234");
});

app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);

app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(statusCode).json({
    success: false,
    status: statusCode,
    message,
  });
});
