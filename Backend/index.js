// Import Required
import express  from "express";
import cors  from "cors";
import mongoose  from "mongoose";
import userRoute from "./Routes/user.route.js";


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




app.use("/api/user", userRoute);