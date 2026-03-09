import mongoose from "mongoose";
import Pdf from "../../models/pdf.models.js";

export default async function savePdf(pdfObj) {
 try {
  
 } catch (err) {
  console.log("error in saving pdf " ,err);
   throw new Error(err.message)
 }
}

