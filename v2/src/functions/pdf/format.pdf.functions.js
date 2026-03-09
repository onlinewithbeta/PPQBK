import gen from "../generate/gen.functions.js";
import mongoose from "mongoose";
import Pdf from "../../models/pdf.models.js";

export default async function formatPDF(pdfObj) {
 const createdPdf = {
  info: {
   title: pdfObj.title,
   course: pdfObj.course,
   author: pdfObj.author,
   created: Date.now(),
   status: "public",
   size: pdfObj.size,
   pages: pdfObj.pages,
   id: pdfObj.id
  },

  system_info: {
   cost: pdfObj.cost,
   verified: false,
   deleted: false
  },

  moreInfo: {},

  impressions: {
   likes: [],
   dislikes: [],
   views: [],
   reports: [],
   comments: []
  }
 };

 console.log("createdPdf");
 console.log(createdPdf);
 console.log("createdPdf");

 const newPdf = new Pdf(createdPdf);
 await newPdf.save();
 console.log("saved");
 return newPdf;

 return createdPdf;
}
