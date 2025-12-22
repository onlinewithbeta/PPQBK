//
import mongoose from "mongoose";

const signinSchema = new mongoose.Schema({
  username: String,
  balance: Number,
  lastTransaction: Object || String,
});

const Signin = mongoose.model("signins", signinSchema);

export default Signin; 