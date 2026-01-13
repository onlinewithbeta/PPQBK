import usersFunctions from "../../functions/users/users.functions.js";
//import { sendGmail } from "../gmail/send.gmail.js";

//functions for auth.
export default async function forgotpassword(req, res) {
 try {
  //verify gmail
  const { gmail } = req.body;
  let user = await usersFunctions.byGmail(gmail);
  
  //Validate gmail is a user.
  if (!user) throw new Error("Please sign up");
  
  //rest OTP and send to the own's gmail
  await usersFunctions.sendOtpUser(user);
  
  res.send({
   success: true,
   message: `An OTP has been sent to ${gmail} `
  });
  
  //try to catch any errorr
 } catch (err) {
  //response
  console.log(err);
  res.status(500).json({
   success: false,
   message: err.message || "Something went wrong. Please try again"
  });
 }
}
