import mongoose from "mongoose";
import transactions from "../../models/transactions.models.js";

export default async function userTransactions(transaction) {
 try {
 	
  const newTransactions = new transactions(transaction);
  await newTransactions.save();
  console.log("Transaction saved");
  console.log(newTransactions)
  return newTransactions;
  
 } catch (err) {
  console.log("error in saving Transaction" ,err);
   throw new Error(err.message)
 }
}

