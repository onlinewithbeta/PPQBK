import mongoose from "mongoose";
import Shares from "../../models/shares.models.js";

async function createShareHolder(gmail) {
 //Create the object
 const shareObbject = {
  gmail: gmail,
  shares: 0,
  transactions: [],
  account: {
   bank_name: "Change me",
   account_number: "Change me",
   account_name: "Change me"
  }
 };

 //store It
 const saveShares = new Shares(shareObbject);
 await saveShares.save();
}

export default createShareHolder;
