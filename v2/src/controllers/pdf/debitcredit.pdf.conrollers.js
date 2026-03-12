import mongoose from "mongoose";
import PDF from "../../models/pdf.models.js";
import usersFunctions from "../../functions/users/users.functions.js";
import gen from "../../functions/generate/gen.functions.js";
import saveFunctions from "../../functions/mongoose/save.functions.js";

async function debitCredit(viewerUserName, fileID) {
 /*------------------------------------------------------
---GET VIEWER , AUTHOR  AMD THE PDF OBJ FROM MONGODB-----
----------------------------------------------------------*/
             //viewer
 const viewer = await usersFunctions.findUser.byUsername(viewerUserName);
             //pdf
 //clear ".pdf" from the fileID to get just the id of the pdf
 fileID = fileID.slice(0, -4);
 const pdfOBJ = await PDF.findOne({
  "info.id": fileID
 });
 // Check if PDF exists
 if (!pdfOBJ) {
  console.error(`PDF with ID ${fileID} not found`);
  return { error: "PDF not found" };
 }
              // author
 const author = await usersFunctions.findUser.byUsername(pdfOBJ.info.author);
 
 
 /*------------------------------------------------------
-------------------RECORD KEEPING-----------------------
----------------------------------------------------------*/
 //pdfOBJ.system_info.cost = 4;
 const cost = Number(pdfOBJ.system_info.cost);

if(viewer.username===author.username)  throw new Error(`Sorry, Your account can not download the PDfs it uploaded!`)

 const transactionid = gen.randomDigits(9);

 // debit viewer
 viewer.wallet.balance = viewer.wallet.balance - cost;
// viewer.wallet.balance =100 + viewer.wallet.balance + cost;
 if (viewer.wallet.balance < 1)
  throw new Error(
   `Insufficient PPQ Coins: You need to buy ${1 + viewer.wallet.balance * -1} PPQ Coins.  `
  );
  const viewTrans = {
  type: "PDF View",
  cost: cost,
  description: `${pdfOBJ.info.title} _ ${pdfOBJ.info.id}`,
  status: "success",
  date: {
   start: Date.now,
   verified: Date.now
  },
  new_balance: viewer.wallet.balance,
  old_balance: viewer.wallet.balance + cost,
  transactionid: transactionid,
  sessionid: transactionid
 };
 console.log(viewTrans)
 viewer.transactions.push(viewTrans);
 await usersFunctions.saveUser(viewer);

 // credit author
 const reward = Math.floor(cost * 0.7);    // Rounds down to nearest integer

 author.wallet.balance = author.wallet.balance + reward;
 author.transactions.push({
  type: "PDF Earning",
  cost: reward,
  description: `${pdfOBJ.info.title} _ ${pdfOBJ.info.id}`,
  status: "success",
  date: {
   start: Date.now,
   verified: Date.now
  },
  new_balance: author.wallet.balance,
  old_balance: author.wallet.balance - reward,
  transactionid: transactionid,
  sessionid: transactionid
 });
await usersFunctions.saveUser(author);

 // record view on pdf obj
 pdfOBJ.impressions.views.push(viewerUserName);
 await pdfOBJ.save();

 // record view on transaction obj
  const gloTransaction = {
   userTransaction: {
    type: "PDF View",
    cost: cost,
    description: `${pdfOBJ.info.title} _ ${pdfOBJ.info.id}`,
    status: "success",
    date: {
     start: Date.now,
     verified: null
    },
   new_balance: viewer.wallet.balance + viewer.wallet.fake_balance,
   old_balance:Number(viewer.wallet.fake_balance) + Number(viewer.wallet.balance) - Number(cost),
   },
   gmail: viewer.gmail,
   transactionid: transactionid,
   sessionid: viewer.sensetive.sessionid.value
  };

  await saveFunctions.transactions(gloTransaction);

 // record view on viewer obj
 // TODO: Record view logic (maybe push viewer to impressions.views array)

 return {
 	t:pdfOBJ.info.title,
 	c:pdfOBJ.info.course,
 }
}

export default debitCredit;
