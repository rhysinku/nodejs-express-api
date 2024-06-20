import mongoose  from "mongoose";

const UserDetailsSchema = new mongoose.Schema(
  {
    uname: String,
    email: { type: String, unique: true },
    password: String,
  },
  {
    collection: "UserDetails",
  }
);
 
const User = mongoose.model("UserDetails", UserDetailsSchema);

export default User