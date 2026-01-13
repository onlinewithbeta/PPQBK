import usersFunctions from "../../functions/users/users.functions.js";
import gen from "../../functions/generate/gen.functions.js";

export default function otpUser(user){
	
	//Reset otp 
	user.sensetive.otp = {
		value:gen.randomDigits(6),
		expires:gen.timeFunc.future(3)
	};
	
	//save user
	usersFunctions.save(user)

	//sendOTP
sendGmail( 'otp', {
	gmail,
	otp,
	expires
});
	
}