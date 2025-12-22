
import mongoose from "mongoose";
import Signin from "../../models/signins.models.js";

export default async function saveUserSign(userSignObj) {
  try {
  	
    console.log("Saving user sign-in:", userSignObj);
    
    // Validate required fields
    if (!userSignObj.username) {
      throw new Error("Username is required");
    }
    
    const newUserSign = new Signin(userSignObj);
    const savedSignin = await newUserSign.save();
    
    console.log("Successfully saved:", savedSignin._id);
    return savedSignin;
  } catch (err) {
    // Log the actual error for debugging
    console.error("Error saving user sign-in:", err.message);
    console.error("Full error:", err);
    
    // Re-throw or return error so calling code knows something failed
    throw err; // OR return { error: err.message };
  }
}