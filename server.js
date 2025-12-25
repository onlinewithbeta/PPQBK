import mongoose from "mongoose";

import app from "./v2/app.js";
import cfg from "./v2/src/cfg.js";

const PORT = cfg.PORT || 3000;
const HOST = "localhost";

// Start the server
const server = app.listen(PORT, HOST, async () => {
 try {
  console.log("connecting to database");
  await mongoose.connect(cfg.MONGODB);
  console.log("successful connection");
 } catch (err) {
  console.log("Failed connection");
 }
 console.log(`Sever running on http://${HOST}:${PORT}`);
 console.log(`📁 Environment: ${process.env.NODE_ENV || "development"}`);
});
