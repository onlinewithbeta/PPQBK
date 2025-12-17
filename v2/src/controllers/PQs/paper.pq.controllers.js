//Get the exampaper
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

  //return to user.
  res.json({
   success: true,
   examPaper
  });

  console.log("examPaper sent");
 } catch (err) {
  //failed to update the Available Courses . user will jut see the old ones.
  console.log("Courses update failed!");
  res.json({
   success: false,
   message: "Failed to get exam paper"
  });
 }
}
