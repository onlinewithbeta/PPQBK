import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
 {
  gmail: {
   type: String,
   required: [true, "Please enter your Gmail address"],
   unique: [
    true,
    "This gmail already has an account. Please login or close the account. You can ask admin to close the account"
   ],
   trim: true,
   lowercase: true,
   maxlength: [100, "Email is too long"],
   match: [
    /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
    "Please enter a valid Gmail address"
   ]
  },
  //wallet info
  shares: {
   type: Number
  },

  account: {
   bank_name: {
    type: String
   },

   account_number: {
    type: String
   },

   account_name: {
    type: String
   }
  },

  wallet: {
   type: String
  },
  
  transactions: [
   {
    type: {
     type: String,
     required: true
    },
    status: {
     type: String,
     enum: ["pending", "success", "failed"],
     default: "pending"
    },
    amount: {
     type: Number,
     required: true,
     min: [1, "Amount is 1"]
    },
    transactionid: {
     type: String
    }
   }
  ]
 },

 {
  timestamps: true
 }
);

const Shares = mongoose.model("Shares", userSchema);

export default Shares;
