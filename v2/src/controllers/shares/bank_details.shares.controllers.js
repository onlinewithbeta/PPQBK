import mongoose from "mongoose";
import Shares from "../../models/shares.models.js";
import sharesFunction from "../../functions/shares/shares.functions.js";

async function bank_details(req, res) {
 try {
  const user = req.user;
  const bank_detail = req.body;
  console.log(`${user.username} wants to add bank details!`);

  //Find Shares info
  const sharesInfo = await sharesFunction.getHolder(user.gmail);
  //add_details
  sharesInfo.account = bank_detail;
  //save
  const saved = new Shares(sharesInfo);
  await saved.save();
  // Send the URL back to the client
  return res.status(200).json(bank_detail);
 } catch (err) {
  // Handle other errors
  console.error("Error in buying shares:", err);
  return res.status(500).json({ message: err.message });
 }
}
export default bank_details;
