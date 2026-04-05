import mongoose from "mongoose";
import Shares from "../../models/shares.models.js";
import createShareHolder from "./create.shares.js";
const Admin = {
 gmail: "ppqadmin@gmail.com"
};

//get available shares {my shares}

export default async function getShareHolder(gmail) {
 
 //Search for shares holder
 let result = await Shares.findOne({ gmail: gmail });
 let adminAccount = await Shares.findOne({ gmail: Admin.gmail });
 
 //if not a holder create holder with zero shares
 if (!result) result = await createShareHolder(gmail);
 result.available_shares = adminAccount.shares;

 /* const result = {
  gmail: "ppqadmin@gmail.com",
  shares: 300,
  transactions: [],
  account: {
   bank_name: "Osairu Bank",
   account_name: "The One",
   account_number: 9117524342
  }
};*/
 return result;
}
