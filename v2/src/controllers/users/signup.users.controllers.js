import usersFunctions from "../../functions/users/users.functions.js";
//import Signin from "../../models/signins.models.js";
import User from "../../models/users.models.js";
//import gen from "../../functions/generate/gen.functions.js";
import Transactions from "../../models/transactions.models.js";

//import { sendGmail } from "../gmail/send.gmail.js";

//functions for auth.
export default async function signUp(req, res) {
 try {
  //create user Object
  const userObj = await usersFunctions.createUser(req.body);

  //try to save it to DB
  console.log("Trying to save");

  const savedUser = await usersFunctions.saveUser(userObj);

  console.log("Tried to save");

  console.log(savedUser);

  /*
  //send notification to user's gmail
  await sendGmail(userObj.gmail, "welcome", {
   gmail: userObj.gmail,
   username: userObj.username,
   password: req.body.password
  });
*/

  //Info user on the website
  res.status(201).json({
   success: true,
   message: "Your account has successfully been created. Please signin",
   user: {
    accesstoken: savedUser.sensetive.accessToken.value,
    gmail: savedUser.gmail
   }
  });

  //try to catch any errorr
 } catch (err) {
  //response
  console.log(err.message);
  res.status(500).json({
   success: false,

   message: err.message || "Something went wrong. Please try again"
  });
 }
}

export async function giftUsers() {
 

/*
//transactions
const allTransactions = await Transactions.find({});
 for (let i = 0; i < allTransactions.length; i++) {
  let transaction = allTransactions[i];
  
  if(transaction.gmail==="osiarurobert@gmail.com") {
  console.log(transaction,i)
  	
  }
  
 }
 console.log(`We have ${allTransactions.length} Users`);
 */
 
/* 
	//Users
 const allUsers = await User.find({"gmail": 'osiarurobert@gmail.com'});
 for (let i = 0; i < allUsers.length; i++) {
  let user = allUsers[i];

  if(user.username=="osiaru") 
  console.log(user.studentInfo);
// console.log(user.studentInfo.views);
  
 }
 console.log(`We have ${allUsers.length} Users`);
*/ 
}
