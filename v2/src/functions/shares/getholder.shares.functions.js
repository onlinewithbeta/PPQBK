import mongoose from "mongoose";
import Shares from "../../models/shares.models.js";
import createShareHolder from "./create.shares.js";

//get available shares {my shares}

export default async function getShareHolder(gmail) {

//Search for shares holder
let result = await Shares.find({gmail:gmail});

//if not a holder create holder with zero shares
if (result.length === 0) {
	result = await createShareHolder(gmail);
}else{
	result = result[0];
}
 
/* const result = {
  gmail: "Osiaru1@gmail.com",
  shares: 20,
  transactions: [
   {
    type: "buy",
    status: "pending",
    amount: 400,
    dates: {
     initial: Date.now(),
     verified: Date.now()
    }
   },
   {
    type: "buy",
    status: "pending",
    amount: 400,
    dates: {
     initial: Date.now(),
     verified: Date.now()
    }
   },
   {
    type: "buy",
    status: "pending",
    amount: 400,
    dates: {
     initial: Date.now(),
     verified: Date.now()
    }
   },
   {
    type: "buy",
    status: "pending",
    amount: 400,
    dates: {
     initial: Date.now(),
     verified: Date.now()
    }
   },
   {
    type: "buy",
    status: "pending",
    amount: 400,
    dates: {
     initial: Date.now(),
     verified: Date.now()
    }
   }
  ],
  account: {
   bank_name: "Osairu Bank",
   account_name: "The One",
   account_number: 9117524342
  }
 };*/
 console.log(result)
 return result;
}
