import Pdf from "../../models/pdf.models.js";

async function getAllPdfs(prop, value) {
 try {
  console.log("Getting pdfs");

  // Create a dynamic query object
  const query = {};
  query[`info.${prop}`] = value; // Assuming you want to search in the info field

  // Fetch PDFs from DB
  const allPDFs = await Pdf.find(query);

  return allPDFs;
 } catch (error) {
  console.error("Error fetching PDFs:", error);
  throw error;
 }
}

// Get PDFs for a specific course
async function getPdfsByCourse(courseName) {
 try {
  courseName = courseName.split("_").join(" ");
  console.log(`Getting PDFs for course: ${courseName}`);

  const pdfs = await Pdf.find({ "info.course": courseName });
console.log(pdfs[0])
  // Format the response as shown in your comment
  return pdfs.map(pdf => ({
   title: pdf.info.title,
   course: pdf.info.course,
   author: pdf.info.author,
   size: pdf.info.size,
   created: pdf.info.created,
   id: pdf.info.id,
   pages: pdf.info.pages,
   cost: pdf.system_info.cost
  }));
 } catch (error) {
  console.error("Error fetching PDFs by course:", error);
  throw error;
 }
}

// Get all public PDFs
async function getPublicPdfs() {
 try {
  const pdfs = await Pdf.find({ "info.status": "Public" });
  return pdfs;
 } catch (error) {
  console.error("Error fetching public PDFs:", error);
  throw error;
 }
}

// Get PDF by ID
async function getPdfById(pdfId) {
 try {
  const pdf = await Pdf.findOne({ "info.id": pdfId });
  return pdf;
 } catch (error) {
  console.error("Error fetching PDF by ID:", error);
  throw error;
 }
}

const getPDFS = {
 Any: getAllPdfs,
 Course: getPdfsByCourse,
 Public: getPublicPdfs,
 Id: getPdfById
};

export default getPDFS;
