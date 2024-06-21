import mongoose  from "mongoose";

const UserDetailsSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true
    },
    email: { type: String, unique: true , required: true },
    password: String,
  },{timestamps:true,
    collection: "UserDetails",
  }
);
 
const User = mongoose.model("UserDetails", UserDetailsSchema);

export default User