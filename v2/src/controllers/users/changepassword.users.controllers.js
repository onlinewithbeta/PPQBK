import usersFunctions from "../../functions/users/users.functions.js";
//import { sendGmail } from "../gmail/send.gmail.js";

//functions for auth.
export default async function changepassword(req, res) {
 try {
  //Exract the parameters.
  const { gmail, otp, password } = req.body;

  //Find the user
  const user = await usersFunctions.findUser.byGmail(gmail);

  //Try to change password and save.
  await usersFunctions.changePassword(user, { gmail, otp, password });

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
   message: "You have successfully changed your password"
  });

  //try to catch any errorr
 } catch (err) {
  //response
  console.log(err);
  res.status(500).json({
   message: err.message || "Could not change password"
  });
 }
}
