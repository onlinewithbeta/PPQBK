import usersFunctions  from "../../functions/users/users.functions.js";
//import { sendGmail } from "../gmail/send.gmail.js";

//functions for auth.
export default async function signUp(req, res) {
 try {
  //create user Object
  const userObj = await usersFunctions.createUser(req.body);

  //try to save it to DB
  await usersFunctions.saveUser(userObj);
  
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
   message: "Your account has successfully been created. Please signin",
   user: userObj
  });
  
  //try to catch any errorr
 } catch (err) {
  //response
  console.log(err);
  res.status(500).json({
   message: err.message || "Something went wrong. Please try again"
  });
 }
}
