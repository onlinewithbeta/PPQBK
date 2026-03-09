import mongoose from "mongoose";
import PDF from "../../models/pdf.models.js";
import usersFunctions from "../../functions/users/users.functions.js";

async function debitCredit(viewerUserName, fileID) {
	//clear ".pdf"
	fileID = fileID.slice(0, -4);
    // get viewer, fileOBJ, author
    const viewer = await usersFunctions.findUser.byUsername(viewerUserName);
    const pdfOBJ = await PDF.findOne({
        "info.id": fileID
    });
    // Check if PDF exists
    if (!pdfOBJ) {
        console.error(`PDF with ID ${fileID} not found`);
        return { error: "PDF not found" };
    }
    const author = await usersFunctions.findUser.byUsername(pdfOBJ.info.author);
const cost = Number(pdfOBJ.cost);    
    
    // debit viewer
    
    // TODO: Implement debit logic
    
    // credit author
    // TODO: Implement credit logic
    
    // record view on pdf obj
    // record view on transaction obj
    // record view on viewr obj
    // TODO: Record view logic (maybe push viewer to impressions.views array)
    
    return { success: true, pdfOBJ, viewer, author };
}

export default debitCredit;