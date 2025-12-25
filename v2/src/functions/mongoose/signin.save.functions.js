import mongoose from "mongoose";
import signins from "../../models/signins.models.js";

export default async function userSign(signin) {
 try {
 	
  const newSignin = new signins(signin);
  await newSignin.save();
  console.log("Signin saved");
  return newSignin;
  
 } catch (err) {
  console.log("error in saving Signin" ,err);
   throw new Error(err.message)
 }
}

