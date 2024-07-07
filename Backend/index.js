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

// Monggo Connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Mongo Connected From Server");
  })
  .catch((e) => console.log(e));

// Express Listen if Running
const port = process.env.PORT || 1234;
app.listen(port, () => {
  console.log(`Server is started: Port: ${port}`);
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
