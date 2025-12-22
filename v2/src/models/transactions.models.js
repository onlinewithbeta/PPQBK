//
import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
 userTransaction: {
  type: {
   type: String,
   required: true
  },
  cost: {
   type: Number,
   required: true,
   min: [0, "Amount cannot be negative"]
  },
  description: String,
  status: {
   type: String,
   enum: ["pending", "success", "failed"],
   default: "pending"
  },
  date: {
   start: {
    type: Date,
    default: Date.now
   },
   verified: {
    type: Date,
    default: null
   }
  },
  new_balance: {
   type: Number,
   default: 0,
   min: [0, "Balance cannot be negative"]
  },
  old_balance: {
   type: Number,
   default: 0,
   min: [0, "Balance cannot be negative"]
  }
 },
 gmail: {
  type: String
 },
 uniqueid: {
  type: String
 },
 userid: {
  type: String
 }
});

const transactions = mongoose.model("transactions", transactionSchema);

export default transactions;
