//ggg
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
   initiated: {
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
   required: true,
   min: [0, "Amount cannot be negative"]
  },
  old_balance: {
   type: Number,
   required: true,
   min: [0, "Amount cannot be negative"]
  }
 },
 gmail: {
  type: String
 },
 transactionid: {
  type: String
 },
 sessionid: {
  type: String
 }
});

const transactions = mongoose.model("transactions", transactionSchema);

export default transactions;
