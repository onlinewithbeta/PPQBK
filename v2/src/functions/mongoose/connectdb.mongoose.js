import mongoose from "mongoose";
import cfg from "../../cfg.js";
await connectDB()
console.log(cfg)

export default async function connectDB() {
    console.log("successful to connection");
    await mongoose.connect(cfg.MONGODB);
    console.log("successful to connection");
}