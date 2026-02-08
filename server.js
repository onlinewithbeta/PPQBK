import mongoose from "mongoose";

import app from "./v2/app.js";
import cfg from "./v2/src/cfg.js";
//import {giftUsers} from "./v2/src/controllers/users/signup.users.controllers.js";

const PORT = cfg.PORT || 3000;
const HOST = "localhost";

// Start the server
const server = app.listen(PORT, async () => {
 try {
  console.log("connecting to database");
  await mongoose.connect(cfg.MONGODB);
  console.log("successful connection");
  //await giftUsers();
 } catch (err) {
  console.log(err.message);
  process.exit(1);
  console.log("Failed connection");
 }
 console.log(`Server running on http://${HOST}:${PORT}`);
 console.log(`📁 Environment: ${process.env.NODE_ENV || "development"}`);
});
