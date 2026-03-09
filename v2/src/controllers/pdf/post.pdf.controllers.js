import gen from "../../functions/generate/gen.functions.js";
import formatPDF from "../../functions/pdf/format.pdf.functions.js";

import multer from "multer";
import fs from "fs";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const upload = multer({
 dest: "uploads/" // Temporary directory for uploaded files
});

// Initialize S3 Client with credentials from environment variables
const s3 = new S3Client({
 region: process.env.AWS_REGION,
 credentials: {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
 }
});

async function postPdf(req, res) {
	 	console.log(`${req.user.username} wants to view a course!`)

	const file = req.file;
	
 if (!req.file) {
  return res.status(400).json({
   success: false,
   error: "No file uploaded."
  });
 }
let body = req.body;
 console.log(body)

 //Saving info
  const fileID = `${gen.randomDigits(5)}_${gen.generateApiKey(6)}`;

 const metaInfo = {
  title: body.name,
  description: body.description,
  course: body.course,
  cost: Number(body.price),
  size: body.size,
  pages: body.pages,
  id:fileID,
  author: "ppq admin"
 };
 
 console.log(metaInfo)
 
 // Now you can create a stream from the file path
 const fileStream = fs.createReadStream(file.path);

 const params = {
  Bucket: process.env.AWS_BUCKET_NAME,
  Key: `pdfs/${fileID}.pdf`,
  Body: fileStream,
  ContentType: "application/pdf"
 };

 try {
  //Save to pdf db
 const pdfOBJ =  await formatPDF(metaInfo);


  const command = new PutObjectCommand(params);
  await s3.send(command);

  // Clean up the temporary file
  fs.unlink(file.path, err => {
   if (err) console.error("Error deleting temp file:", err);
  });

  //Save to db fileID

  res.json({
   success: true,
   id:fileID,
   message: `PDF uploaded successfully! File ID :  ${fileID}`
  });
 } catch (err) {
  // Clean up temp file even on error
  fs.unlink(file.path, err => {
   if (err) console.error("Error deleting temp file:", err);
  });

  console.error("Upload error:", err);
  res.status(500).json({
   success: false,
   error: err.message
  });
 }
}

export default postPdf;
