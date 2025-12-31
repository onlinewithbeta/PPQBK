//Get the exampaper
import gen from "../../functions/generate/gen.functions.js";
import saveFunctions from "../../functions/mongoose/save.functions.js";
import usersFunctions from "../../functions/users/users.functions.js";
import {
 selectAccesscode,
 createPqFiles
} from "../../functions/pq/pqdb.functions.js";
import cfg from "../../cfg.js";

//function to get the required paper
export default async function paper(req, res) {
 //Extract the Course and session wanted.
 const course = JSON.parse(req.query.course);
 const session = JSON.parse(req.query.session);

 //Available Courses update initiated"
 console.log(`Fetching exam paper for ${course} ${session}.`);

 try {
  //fetch the course here
  const currentAccessCode = await selectAccesscode(); //Get accesscode
  const pqFile = createPqFiles(currentAccessCode); //Creater Paper getter
  const examPaper = await pqFile.get(`/${course}/main/${session}.json`); //make the request

  //deduct and record

  //save to user
  const user = req.user;
  const payLoad = {
   sessionid: user.sensetive.sessionid.value,
   date: Date.now,
   balance: user.wallet.balance,
   item: `${course} ${session}`
  };
  user.studentInfo.views.unshift(payLoad);
  await usersFunctions.saveUser(user);

  //save globally

  const transaction = {
   userTransaction: {
    type: "PQ View",
    cost: 0,
    description: `${course} ${session}`,
    status: "success",
    date: {
     start: Date.now,
     verified: null
    }
   },
   gmail: user.gmail,
   transactionid: gen.randomDigits(10),
   sessionid: user.sensetive.sessionid.value
  };

  await saveFunctions.transactions(transaction);

  //Send exam paper to user.
  res.json({
   success: true,
   data: examPaper.data
  });

  console.log("examPaper sent");
 } catch (err) {
  //failed to update the Available Courses . user will jut see the old ones.
  console.log("Courses update failed!");
  console.log(err);
  res.json({
   success: false,
   message: "Failed to get exam paper"
  });
 }
}
