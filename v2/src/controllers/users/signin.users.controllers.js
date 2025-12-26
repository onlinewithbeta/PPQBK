import usersFunctions from "../../functions/users/users.functions.js";
import gen from "../../functions/generate/gen.functions.js";
import saveUserSign from "../../models/signins.models.js";

//import { sendGmail } from "../gmail/send.gmail.js";

//functions for auth.
export default async function signin(req, res) {
 try {
  //Extract the creditentials
  const { identifier, useGmail, useUsername, password } = req.body;
  let user = null; // set useer to null

  //look for user.
  if (useGmail) user = await usersFunctions.findUser.byGmail(identifier);
  if (useUsername) user = await usersFunctions.findUser.byUsername(identifier);

  //If user is not in db
  if (!user) throw new Error(" User not found");

  //check if the password is correct.
  let correctPassword = await gen.passwordFunc.compare(
   password,
   user.sensetive.password.value
  );
  if (!correctPassword) {
   //save wrong attempt
   user.sensetive.password.trails.push({
    date: Date.now(),
    input: password
   });
   await usersFunctions.saveUser(user);
   //throw error
   throw new Error("user sent wrong password");
  }

  //try to save login to DB
  // In your route handler
  user.signins.push({
   date: Date.now(),
   ip: req.ip,
   userAgent: req.headers["user-agent"] // This is the correct way
  });
  console.log(`successful login by ${user.username}`);
  await usersFunctions.saveUser(user);

  console.log("Attempting to save user sign-in...");
//save signin globally
  const result = await usersFunctions.saveUserSign({
   username: user.username,
   balance: user.wallet.balance + user.wallet.fake_balance,
   lastTransaction: user.transactions[0]
  });

  console.log("Save result:", result);

  if (!result) console.error("saveUserSign returned undefined/null");
  await result.save();

  //Info user on the website
  res.status(200).json({
   success: true,
   message: `Welcome back, ${user.username}`,
   userinfo: {
    accessToken: user.sensetive.accessToken.value,
    balance: user.wallet.balance + user.wallet.fake_balance,
    wallet: user.wallet.address
   }
  });

  /*
  //send notification to user's gmail
  await sendGmail(userObj.gmail, "welcome", {
   gmail: userObj.gmail,
   username: userObj.username,
   password: req.body.password
  });
*/

  //try to catch any errorr
 } catch (err) {
  //response
  console.log(err);
  res.status(500).json({
   message: err.message || "Something went wrong. Please try again"
  });
 }
}

const expectedBody = {
 password: "	password",
 useGmail: "true or false",
 useUsername: "true or false",
 identifier: " gmail or username"
};
