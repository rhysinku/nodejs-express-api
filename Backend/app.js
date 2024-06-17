// init express
const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());

// init Mongo
const mongoose = require("mongoose");
const mongoUrl =
  "mongodb+srv://rhysindodev:eOR1HJsCqGsWzVO7@cluster0.mqk2f9r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Import Model
require("./Model/userDetails");

// Declare Model
const User = mongoose.model("UserDetails");

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

// Adding Data
app.post("/register", async (req, res) => {
  const { uname, email, password } = req.body;

  try {
    const emailExist = User.find({ email });

    if (emailExist) {
      return res.send({ status: "Email already exists" });
    }

    await User.create({
      uname,
      email,
      password,
    });
    res.send({ status: "Data Added" });
  } catch (error) {
    res.send(error);
  }
});
