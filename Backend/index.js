// Import Required
import express  from "express";
import jwt  from "jsonwebtoken";
import cors  from "cors";
import mongoose  from "mongoose";
import userRoute from "./Routes/user.route.js";

import User from "./Model/userDetails.model.js";


// Declare Required
const app = express();

// Use Required
app.use(express.json());
app.use(cors());


// jwt Secret
const JWT_SECRET =
  "pockeypeperoaj==12i3uppupsaudioahsdjnzpkmcdknhbv210312ie9qwusiadjlncshdbasgdcnahsxjkdsadma";

// Mongo Url
const mongoUrl =
  "mongodb+srv://rhysindodev:eOR1HJsCqGsWzVO7@cluster0.mqk2f9r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Import Model
// require("./Model/userDetails");

// Declare Model
// const User = mongoose.model("UserDetails");

// Monggo Connection
mongoose
  .connect(mongoUrl )
  .then(() => {
    console.log("Mongo Connected From Server");
  })
  .catch((e) => console.log(e));

// Express Listen if Running
app.listen(1234, () => {
  console.log("Server is started: Port: 1234");
});

// Register User
app.post("/register", async (req, res) => {
  const { uname, email, password } = req.body;

  try {
    const emailExist = await User.find({ email });
    if (!emailExist) {
      return res.send({ status: "Email already exists" });
    }

    await User.create({
      username : uname,
      email,
      password,
    });
    res.send({ status: "Data Added" });
  } catch (error) {
    res.send(error);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.send({ status: "No User Found" });
    }

    if (password === user.password) {
      const accToken = jwt.sign({}, JWT_SECRET);

      if (res.status(200)) {
        return res.send({ status: "Account Login", accToken });
      } else {
        return res.send({
          status: "Incorrect Details",
          accToken,
        });
      }
    }
  } catch (error) {
    return res.send(error);
  }
});



app.use("/api/user", userRoute);