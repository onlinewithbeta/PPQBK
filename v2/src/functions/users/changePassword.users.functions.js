import gen from "../generate/gen.functions.js";
import userFunctions from "./users.functions.js";

export default async function changepassword(user, params) {
 try {
  //Validate otp
  let otp = user.sensetive.otp;
  if (otp.value !== params.otp) throw new Error("Incorrect OTP");
  if (gen.moment.diff(otp.expires, gen.moment.now()) > 0)
   throw new Error("Expired otp");
  //reset otp
  otp = {
   value: gen.randomDigits(6),
   expires: gen.moment.now()
  };
  user.sensetive.otp = otp;

  //change password
  user.sensetive.password.value = await gen.passwordFunc.hasher(
   params.password
  );
  //save changes
  userFunctions.saveUser(user);

  console.log(`changed password for ${user.gmail}`);
 } catch (err) {
  console.log(err);
  throw Error(`Unable to change password because of ${err.message}`);
 }
}
