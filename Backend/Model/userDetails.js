import mongoose  from "mongoose";

const UserDetailsSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true
    },
    email: { type: String, unique: true },
    password: String,
  },
  {
    collection: "UserDetails",
  }
);
 
const User = mongoose.model("UserDetails", UserDetailsSchema);

export default User