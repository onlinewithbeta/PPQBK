import usersFunctions from "./users.functions.js";
import gen from "../generate/gen.functions.js";
import cfg from "../../cfg.js";

export default async function otpUser(user) {
 //Reset otp
 let otp = user.sensetive.otp;
 
 console.log(otp);
 otp = {
  value: gen.randomDigits(6),
  expires: gen.moment.future(3)
 };
 console.log(otp);

 user.sensetive.otp = otp;

 //save user
 usersFunctions.saveUser(user);
let sendOTPeq = await fetch(`${cfg.emailer}/otp?gmail=${encodeURIComponent(user.gmail)}&otp=${encodeURIComponent(otp.value)}`);

/*
 //sendOTP
 sendGmail("otp", {
  gmail: user.gmail,
  otp: user.sensetive.otp.value,
  expires: user.sensetive.otp.expires
 });
 */
}
