//
import mongoose from "mongoose";

const signinSchema = new mongoose.Schema({
  usergmail: String,
  balance: Number,
  lastTransaction: Object || String,
})

const Signin = mongoose.model("Signin", signinSchema);

export default Signin; 