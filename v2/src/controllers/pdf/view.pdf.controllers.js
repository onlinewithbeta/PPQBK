import{
	S3Client,
 GetObjectCommand
} from "@aws-sdk/client-s3";

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
 		 	console.log(`${req.user.username} wants to view a course!`)

 	console.log(`${req.user.username} wants to view a course!`)

  // Get the filename from the URL parameter
  const filename = req.params.id;
  console.log(filename)
  //const filename ="1772841376014-1772734082426-yr1.pdf";

  // Construct the full S3 key (path) where the file is stored
  const key = `pdfs/${filename}`;

  // Prepare parameters to get the file from S3
  const params = {
   Bucket: process.env.AWS_BUCKET_NAME,
   Key: key
  };

  // Create command to get the object from S3
  const command = new GetObjectCommand(params);

  // Send the command and get the response from S3
  const response = await s3.send(command);

  // Set the response headers to indicate it's a PDF file
  res.setHeader("Content-Type", "application/pdf");

  // Set Content-Disposition to tell browser to display PDF (inline) or download (attachment)
  // Using 'inline' makes the browser display the PDF directly
  res.setHeader("Content-Disposition", `inline; filename="${filename}"`);

  // If you want to force download instead of display, use:
  // res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

  // Stream the PDF data from S3 to the client
  // The Body from S3 is a ReadableStream, so we pipe it to the response
  response.Body.pipe(res);

  // Handle any errors during streaming
  response.Body.on("error", err => {
   console.error("Error streaming file:", err);
   if (!res.headersSent) {
    res.status(500).send("Error streaming file");
   }
  });
 } catch (err) {
  // Handle specific S3 errors
  if (err.name === "NoSuchKey") {
   // File not found in S3
   return res.status(404).send("File not found");
  }
  // Handle other errors
  console.error("Error fetching file:", err);
  res.status(500).send(err.message);
 }
}

export default view;