//
import mongoose from "mongoose";

const pdfSchema = new mongoose.Schema(
 {
  info: {
   title: String,
   course: String,
   description: String,
   author: String,
   size: String,
   created: Date,
   status: { type: String, default: "Public" },
   id: {type: String,
      unique: true,
      required: true,
      index: true 
   },
   size: String,
   pages: String,
   pages: Number
  },
  system_info: {
   cost: Number,
   verified: { type: Boolean, default: false },
   deleted: { type: Boolean, default: false }
  },
  
  moreInfo: mongoose.Schema.Types.Mixed, // Keep flexible if needed
  
  impressions: {
   likes: Array, // Assuming user IDs or usernames
   dislikes: Array,
   views: Array,
   reports: [
    {
     reason: String,
     reporter: String,
     date: { type: Date, default: Date.now }
    }
   ],
   comments: [
    {
     user: String,
     text: String,
     date: { type: Date, default: Date.now }
    }
   ]
  }
 },
 {
  timestamps: true // Auto-add createdAt and updatedAt
 }
);

const Pdf = mongoose.model("pdfs", pdfSchema);

export default Pdf;
