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
   account_number: 1010101010,
   account_name: "Change me"
  }
 };

 //store It
 const saveShares = new Shares(shareObbject);
let result = await saveShares.save();
 
 
 result.available_shares = 600;
return result;
}

export default createShareHolder;
