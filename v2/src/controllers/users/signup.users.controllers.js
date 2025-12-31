import usersFunctions from "../../functions/users/users.functions.js";
import User from "../../models/users.models.js";

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
   	accesstoken:user.sensetive.accessToken.value,
   	gmail:user.gmail
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




/*

export async function giftUsers (){
	const allUsers = await User.find({});
let tokens =0;

for(let i = 0; i<allUsers.length; i++){
	const user = allUsers[i];
	if(user.wallet.balance>1){
		tokens = tokens + user.wallet.balance;
	}
			console.log(tokens)

}
}

*/