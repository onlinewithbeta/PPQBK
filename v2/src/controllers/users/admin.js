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

//export default exportUsersToVCF

async function userFunc() {
 //Users
 console.log("Getting users");
 const allUsers = await User.find({});
 let active1 = 0;
 let active2 = 0;
 let active3 = 0;
 let active4 = 0;
 let active5 = 0;
 let active6 = 0;
 let active7 = 0;

 console.log("analy users");
 let limit = 0;

 for (let i = 0; i < allUsers.length; i++) {
  //console.log(i)

  let user = allUsers[i];
  // Gift course rep
  if (user.signins.length > 0) active1++; //User signin
  if (user.signins.length < 1) active2++; //no signin

  if (user.wallet.fake_balance < 15) active3++; //User viewed many courses
  
  if (user.studentInfo.views.length === 1) active4++; //User view 1 course

  if (user.studentInfo.views.length < 1) active5++; //no view user
  if (user.studentInfo.views.length > 0) {
   active6++; //users has view
   /*
  	console.log({
  	name:user.gmail,
  	dept:user.studentInfo.department,
  	mat:user.studentInfo.matno,
  	phone:user.phone
  })
  */
  }
  
  if (user.wallet.balance > 300) {
  	active7++;
  	console.log(user.username,user.phone,user.studentInfo.department,user.studentInfo.faculty, user.wallet.balance )
  }//investor
  /*
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
   */
 }
 console.log(`We have ${active7} User can invest`);

 console.log(`We have ${allUsers.length} Users`);
 console.log(`We have ${active1} User signin`);
 console.log(`We have ${active2} no signin`);
 console.log(`We have ${active3} User viewed many courses`);
 console.log(`We have ${active4} User view 1 course`);
 console.log(`We have ${active5} no view user`);
 console.log(`We have ${active6} users has view`);
}

async function listF_D() {
 //Users
 console.log("Getting users");
 const allUsers = await User.find({});

 console.log("analysing users");
 let limit = 0;

 for (let i = 0; i < allUsers.length; i++) {
  let user = allUsers[i];
  console.log(user.studentInfo);
 }

 console.log(`We have ${allUsers.length} Users`);
}

async function transactionFunc() {
 let inactiveUsers = [];
 //transactions
 const allTransactions = await Transactions.find({});

 for (let g = 0; g < 40; g++) {
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
    const details = {
     j: transaction.userTransaction.type,
     user: transaction.gmail,
     description: transaction.userTransaction.description,
     time: transaction.userTransaction.date.initiated
    };

    day.push(details);
    if (g <2) console.log(details);
   }
  }

  console.log(gen.moment.future(-g * 60 * 24), `$${day.length}.00 `);
 }

 console.log(`We have ${allTransactions.length} Transactions`);
 console.log(inactiveUsers);
}

let yr1 = 0;
let yr2 = 0;
let yr3 = 0;

async function dailyViews() {
 let inactiveUsers = [];
 //transactions
 const allTransactions = await Transactions.find({});
 console.log(`We have ${allTransactions.length} Transactions`);

 for (let g = 0; g < 30; g++) {
  let day = [];

  // Calculate start and end of the target day
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() - g);
  targetDate.setHours(0, 0, 0, 0); // Start of the day (00:00)

  const nextDay = new Date(targetDate);
  nextDay.setDate(nextDay.getDate() + 1); // Start of next day (00:00)

  for (let i = 0; i < allTransactions.length; i++) {
   let transaction = allTransactions[i];

   const transactionDate = new Date(transaction.userTransaction.date.initiated);

   // Check if transaction date falls within the target calendar day
   if (transactionDate >= targetDate && transactionDate < nextDay) {
    const details = {
     j: transaction.userTransaction.type,
     user: transaction.gmail,
     description: transaction.userTransaction.description,
     time: transaction.userTransaction.date.initiated
    };

    day.push(details);
      if (g === 0) console.log(details)
    // 1. Group transactions by user
    const userMap = new Map();

    const fifthChar = transaction.userTransaction.description[4]; // zero-based index 4 = 5th character
    // Determine level based on 5th character (index 4)

    if (fifthChar === "1" || fifthChar === "3") {
     yr1++;
    } else {
     yr2++;
    }

    //console.log(details);
    //   }
   }
  }
  console.log(yr1, yr2);
  yr1 = 0;
  yr2 = 0;
  // Format the date for display
  const dateLabel = targetDate.toLocaleDateString("en-US", {
   month: "short",
   day: "numeric",
   year: "numeric"
  });
  console.log(`${dateLabel}:`, day.length);

 }
  console.log(`We have ${allTransactions.length} Transactions`);
  console.log(yr1, yr2);
}

async function analyzeUsers() {
 const allTransactions = await Transactions.find({}); // your existing fetch

 let yr1 = 0;
 let yr2 = 0;
 let yr3 = 0;

 // 1. Group transactions by user
 const userMap = new Map();

 for (const txn of allTransactions) {
  const email = txn.gmail;
  const desc = txn.userTransaction.description || "";

  const fifthChar = desc[4]; // zero-based index 4 = 5th character
  // Determine level based on 5th character (index 4)

  if (txn.userTransaction.type === "funding") {
   console.log(txn.userTransaction.gmail);
  }
 }
}

async function deletedUser(userIdU, i) {
 //A User
 //let aUsers = await User.find({ gmail: "" });
 // aUsers = aUsers[0];
 // console.log(aUsers);

 // console.log(aUsers[0].sensetive.password.value);

 // const hashPasswordValue = await gen.passwordFunc.hasher('Samuel05');
 //aUsers[0].gmail = '';
 //await usersFunctions.saveUser(aUsers[0]);

 // If you have the user ID
 console.log(i);
 const userId = userIdU._id; // Replace with actual ID
 const deletedUser = await User.findByIdAndDelete(userId);
 console.log("Deleted user:", deletedUser);
}

async function giftUser(amount) {
 let thisUsers = await User.find({ gmail: "@gmail.com"});
 thisUsers = thisUsers[0];

 thisUsers.wallet.balance = thisUsers.wallet.balance + amount;

 await usersFunctions.saveUser(thisUsers);

 console.log(`${thisUsers.username} has be gifted ${amount} PPQ coins`);
}

async function editUser(phone) {
 //A User
 let thisUsersA = await User.find({ gmail: "@gmail.com" });
 const thisUsers = thisUsersA[0];
 console.log(thisUsers);
 console.log(thisUsers.studentInfo.views);
 //Edit
 // const hashPasswordValue = await gen.passwordFunc.hasher('200311@lB');
 // thisUsers.sensetive.password.value=hashPasswordValue;

 //save
// await usersFunctions.saveUser(thisUsers);
}

async function maintainDB() {
 // console.clear();
// await giftUser(2000)
//await dailyViews();
//await userFunc();
 // await analyzeUsers();
/// await editUser();

 // await listF_D();
 console.log("Osiaru administration");
}

export default maintainDB;
