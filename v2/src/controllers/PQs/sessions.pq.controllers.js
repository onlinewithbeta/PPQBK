//Get the sessions
import {
 selectAccesscode,
 createPqInfo
} from "../../functions/pq/pqdb.functions.js";
import cfg from "../../cfg.js";

//Get the session
export default async function sessions(req, res) {
//extract the wanted course
 const course = req.query.course;

 //Seacrh for the Available sessions for our course
 console.log(`fetching sessions for ${course}`);
 try {
  //fetch the sessions here
  let currentAccessCode = await selectAccesscode(); //get access code
  const pqInfo = createPqInfo(currentAccessCode); // info getter
  const uptodateCourses = await pqInfo.get(cfg.PQDB); // make request

  // Format the Online Courses data
  let availableSessions = await pqInfo.get(`repos/UniportPQ/${course}/contents/`);
  availableSessions = availableSessions.data.map(repo => repo.name);
  availableSessions = availableSessions.map(repo =>
   repo.replace(/\.json$/, "").replace(/_/g, "/")
  );
//Send sessions to user
res.json({
   success: true,
   data:availableSessions
  });

  console.log("Seesions sent!");
 } catch (err) {
  //failed to send sessions.
  console.log("Seesions Not sent!");
  console.log(err.message);
  
  res.status(500).json({
   success: false,
   message:'Unable to get the Available sessions.'
  });

 }
}
