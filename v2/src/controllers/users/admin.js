import usersFunctions from "../../functions/users/users.functions.js";

//import Signin from "../../models/signins.models.js";
import User from "../../models/users.models.js";
import gen from "../../functions/generate/gen.functions.js";
import Transactions from "../../models/transactions.models.js";

//import { sendGmail } from "../gmail/send.gmail.js";

import mongoose from "mongoose";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const generateVCard = user => {
 // Format matno
 const matno = user.studentInfo?.matno || "";
 const formattedMatno = matno.length > 15 ? `u2025${matno}` : matno;

 // Create name
 const fullName = [
  user.username,
  formattedMatno,
  user.studentInfo?.department || ""
 ]
  .filter(Boolean)
  .join(" ")
  .trim();
 console.log(fullName);

 // Escape special characters for vCard
 const escapeVCard = text => String(text || "").replace(/[,;:\\]/g, "\\$&");

 // Generate vCard 3.0 format
 const sections = [
  "BEGIN:VCARD",
  "VERSION:3.0",
  `FN:${escapeVCard(fullName)}`,
  `N:${escapeVCard(fullName)};;;;`,
  `TEL;TYPE=CELL:${escapeVCard(user.phone)}`,
  `EMAIL:${escapeVCard(user.gmail)}`,
  `NOTE:${[
   `Username: ${escapeVCard(user.username)}`,
   `Matric No: ${escapeVCard(user.studentInfo?.matno || "N/A")}`,
   `Department: ${escapeVCard(user.studentInfo?.department || "N/A")}`,
   `Faculty: ${escapeVCard(user.studentInfo?.faculty || "N/A")}`,
   `Email: ${escapeVCard(user.gmail)}`,
   `Verified: ${user.studentInfo?.verified ? "Yes" : "No"}`,
   `Banned: ${user.studentInfo?.banned ? "Yes" : "No"}`
  ].join("\\n")}`,
  `REV:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z`,
  "END:VCARD"
 ];

 return sections.join("\n");
};

const exportUsersToVCF = async () => {
 try {
  const allUsers = await User.find({}).lean();

  if (!allUsers.length) {
   console.log("No users found to export");
   return { success: false, count: 0 };
  }

  // Create vcf directory
  const vcfDir = path.join(__dirname, "vcf_exports");
  await fs.mkdir(vcfDir, { recursive: true });

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const masterVCF = path.join(vcfDir, `all_users_${timestamp}.vcf`);

  // Generate all vCards in parallel
  const vCardResults = await Promise.all(
   allUsers.map(async (user, index) => {
    console.log(
     `Processing: ${user.username} (${index + 1}/${allUsers.length})`
    );

    const vcard = generateVCard(user);

    // Save individual vCard
    const safeUsername = user.username
     .replace(/[^a-z0-9]/gi, "_")
     .toLowerCase();
    const individualVCF = path.join(vcfDir, `${safeUsername}_${timestamp}.vcf`);
    await fs.writeFile(individualVCF, vcard);

    return vcard;
   })
  );

  // Save master VCF
  await fs.writeFile(masterVCF, vCardResults.join("\n"));

  console.log(`\n✓ We have ${allUsers.length} Users`);
  console.log(`✓ All contacts saved to: ${masterVCF}`);
  console.log(`✓ Individual vCards saved in: ${vcfDir}`);

  return {
   success: true,
   count: allUsers.length,
   masterPath: masterVCF,
   directory: vcfDir
  };
 } catch (error) {
  console.error("❌ Error exporting users to VCF:", error.message);
  throw error;
 }
};
/*
// Execute with top-level await (ES6)
try {
 const result = await exportUsersToVCF();
 console.log("Export completed:", result);
} catch (error) {
 console.error("Export failed:", error);
}
*/

//export default exportUsersToVCF;

async function maintainDB() {
 let inactiveUsers = [];
 //transactions
 const allTransactions = await Transactions.find({});

 for (let g = 0; g < 90; g++) {
  let day = [];

  for (let i = 0; i < allTransactions.length; i++) {
   let transaction = allTransactions[i];

   // More efficient - deletes all matching transactions in one query
   //const result = await Transactions.deleteMany({ gmail: "osiarurobert@gmail.com" });
   //console.log(`Deleted ${result.deletedCount} transactions`);

   const interval = gen.moment.diff(
    transaction.userTransaction.date.initiated,
    gen.moment.now()
   );

   //Analy grow
   if (interval > 24 * 60 * g && interval < 24 * 60 * (g + 1)) {
    //Check the day.
    let details = {
     user: transaction.gmail,
     description: transaction.userTransaction.description,
     time: transaction.userTransaction.date.initiated
    };
    day.push(details);
    if (g < 1) console.log(details);
   }
  }

  console.log(gen.moment.future(-g * 60 * 24), `$${day.length}.00 `);
 }
 
 //console.clear();

 //Users
 console.log("Getting users");
 const allUsers = await User.find({});
 let active1 = 0;
 let active2 = 0;
 let active3 = 0;
 let active4 = 0;
 let active5 = 0;
 let active6 = 0;

 console.log("analy users");
 let limit = 0;
 
 for (let i = 0; i < allUsers.length; i++) {
  let user = allUsers[i];

  // Gift course rep
  if (user.signins.length < 3) active1++;
  
  /*{
   if (i > 1318) {
   	
   	limit++;
    console.log(` limit : ${limit}`);
   	if(limit>170) throw new Error("limit reached")

    active1++;
    console.log(`${i} sent`);
    await fetch(`http://localhost:2030/otp?username=${user.username}&&gmail=${user.gmail}`);
    //await fetch(`http://localhost:2030/otp?gmail=${user.gmail}`);
    console.log(`User ${user.gmail} phone ${user.phone}, from${user.studentInfo.department} has ${user.wallet.balance} and ${user.wallet.fake_balance}`)
   }
  }
*/

  if (user.wallet.fake_balance < 20) active2++;
  if (user.studentInfo.views.length > 0) active3++;
  if (user.signins.length > 0) {
   active4++;
   if (user.studentInfo.views.length === 0) {
    console.log("____________________________")
    console.log({
     username: user.username,
     dept: user.studentInfo.department,
     phone: user.phone,
     no: user.studentInfo.matno
    });
    console.log("____________________________")
   }
  }

  if (user.studentInfo.views.length > 20) active5++;
  if (user.wallet.fake_balance > 300) {
   active6++;
   console.log("_______________");
   console.log("_______________");
   console.log("_______________");
   console.log("_______________");

   console.log({
    //		name : user.username,
    phone: user.phone,
    dept: user.studentInfo.department,
    //				faculty : user.studentInfo.faculty,
    wallet: [user.wallet.balance, user.wallet.fake_balance],
    id: user.studentInfo.matno,
    views: [
     user.studentInfo.views.length,
     user.studentInfo.views[user.studentInfo.views.length - 1],
     user.studentInfo.views[0]
    ]
   });
   //console.log(`user.signins ${user.signins.length}`)
   //	console.log(`user.studentInfo.views ${[]}`)
  }
  
 }
 console.log(`We have ${allTransactions.length} Transactions`);
 console.log(`We have ${allUsers.length} Users`);
 console.log(`We have ${active1} active1 Users`);
 console.log(`We have ${active2} Users used tokens`);
 console.log(`We have ${active3} Users viewed course`);
 console.log(`We have ${active4} Users signin`);
 console.log(`We have ${active5} active5 Users`);
 console.log(`We have ${active6} active6 Users`);
 console.log(inactiveUsers);


 //A User
 
 const aUsers = await User.find({gmail:""});
 console.log(aUsers);
// console.log(aUsers[0].sensetive.password.value);
 
 // const hashPasswordValue = await gen.passwordFunc.hasher('Samuel05');
  //aUsers[0].gmail = 'bariyacynthia@gmail.com';
 //await usersFunctions.saveUser(aUsers[0]);
 
}

export default maintainDB;
