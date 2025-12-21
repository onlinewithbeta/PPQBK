import mongoose from "mongoose";
import User from "../../models/users.models.js";

export default async function saveUser(userObj) {
 try {
  //  throw new Error("the username is already taken")
  const newUser = new User(userObj);
  await newUser.save();
  console.log("saved");
  return newUser;
 } catch (err) {
  console.log(err);
 }
}

