//List the available courses

import {
 selectAccesscode,
 createPqInfo
} from "../../functions/pq/pqdb.functions.js";
import cfg from "../../cfg.js";

//Varable that will store the available Courses
let availableCourses = null;

//update the availableCourses value
//update will happen once as the server starts
async function updateavailableCourses() {
 //Available Courses update initiated"
 console.log("Available Courses update initiated");
 try {
  //fetch the courses here
  let currentAccessCode = await selectAccesscode(); //Get our accesscode
  const pqInfo = createPqInfo(currentAccessCode); //Create the information getter
  const uptodateCourses = await pqInfo.get(cfg.PQDB);//Get our informations
  
  //Put our results in an array
  availableCourses = uptodateCourses.data.map(repo => ({
   name: repo.name,
   description: repo.description
  }));
  
  console.log("Available Courses update success!");
 } catch (err) {
  //failed to update the Available Courses . user will jut see the old ones.
  console.log("Courses update failed!");
 }
}
//initiate  the upadte
await updateavailableCourses();

//route handler
export default function courses(req, res) {
 console.log("courses viewed");
 res.json({
   success: true,
   availableCourses
  });

}
