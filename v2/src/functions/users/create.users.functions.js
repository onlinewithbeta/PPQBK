import gen from "../generate/gen.functions.js";

export default async function createUser(userObj) {
 const hashPasswordValue = await gen.passwordFunc.hasher(userObj.password);

 const createdUser = {
  username: userObj.username,
  gmail: userObj.gmail,
  phone: userObj.phone,
  avatar:"avatar1",

  studentInfo: {
   faculty: userObj.faculty,
   department: userObj.department,
   matno: userObj.matno,
   verified: false,
   banned: false
  },

  sensetive: {
   accessToken: {
    value: `PPQ_${gen.generateApiKey(200)}`,
    expires: gen.moment.future(3600000)
   },
   sessionid: {
    value: `session_${gen.generateApiKey(10)}`,
    expires: gen.moment.future(4)
   },
   otp: {
    value: gen.randomDigits(6),
    expires: gen.moment.future(4)
   },
   password: {
   	value:hashPasswordValue,
   	trails:[]
   }
  },

  //wallet info
  wallet: {
   balance:0,
   fake_balance:20,
   address: gen.genWalletAddress()
  },
  transactions: [],

  referral:"osiaru",
  
  referrals: [],
  signins: []
 };
 
console.log("createdUser")
console.log(createdUser)
console.log("createdUser")

 return createdUser;
}


let fu=
{
	"username":"bekekd8",
	"password":"jxjx7xdbx9xx_",
	"gmail":"believe@gmail.com",
	"phone":"9064498317",
	
	"faculty":"eng",
	"department":"civil",
	"matno":"xxkd9ene",

}