import mongoose from "mongoose";
import User from "../../models/users.models.js";

export default async function saveUser(userObj) {
 try {
  const newUser = new User(userObj);
  await newUser.save();
  console.log("saved");
  return newUser;
 } catch (err) {
  console.log(err);
   throw new Error(err.message)
 }
}

