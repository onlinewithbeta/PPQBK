import {
 S3Client,
 GetObjectCommand
} from "@aws-sdk/client-s3";
// Add this line
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import debitCredit from "./debitcredit.pdf.conrollers.js";

// Initialize S3 Client with credentials from environment variables
const s3 = new S3Client({
 region: process.env.AWS_REGION,
 credentials: {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
 }
});

async function view(req, res){
 try {
    console.log(`${req.user.username} wants to view a course!`);

    // Get the filename from the URL parameter
    const filename = req.params.id;
    console.log(filename)

    // Construct the full S3 key (path) where the file is stored
    const key = `pdfs/${filename}`;

    // Debit the viewer and credit the author (Keep your business logic here)
   const fileTile =  await debitCredit(req.user.username, filename);

    // Prepare parameters for the GetObject command
    // In your backend controller
const command = new GetObjectCommand({
  Bucket: process.env.AWS_BUCKET_NAME,
  Key: key,
  ResponseContentDisposition: `attachment; filename="PPQ_${fileTile}"` // Force filename
});

const signedUrl = await getSignedUrl(s3, command, { 
  expiresIn: 60 
});
    console.log("Generated one-time download link:", signedUrl);

    // Send the URL back to the client
    return res.status(200).json({ 
        url: signedUrl,
        expiresIn: 60,
        message: "This link will expire in 60 seconds and can be used to download the file directly from S3."
    });

 } catch (err) {
    // Handle specific S3 errors
    if (err.name === "NoSuchKey") {
        // File not found in S3
        return res.status(404).json({message :"File not found"});
    }

    // Handle other errors
    console.error("Error generating signed URL:", err);
    return res.status(500).json({message :err.message});
 }
}
export default view;