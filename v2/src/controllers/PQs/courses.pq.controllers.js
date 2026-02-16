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
  console.log("Available Courses update initiated");
  try {
    let currentAccessCode = await selectAccesscode();
    const pqInfo = createPqInfo(currentAccessCode);
    
    let allRepos = [];
    let page = 1;
    let pageSize = 100; // Max allowed by GitHub
    
    while (true) {
      const response = await pqInfo.get(`${cfg.PQDB}?page=${page}&per_page=${pageSize}`);
      const repos = response.data;
      
      if (repos.length === 0) break;
      
      allRepos = allRepos.concat(repos);
      
      // If we got fewer repos than requested, we're on the last page
      if (repos.length < pageSize) break;
      
      page++;
    }
    
    availableCourses = allRepos.map(repo => ({
      name: repo.name,
      description: repo.description
    }));
    
    console.log(`Total courses fetched: ${availableCourses.length}`);
    console.log("Available Courses update success!");
    
  } catch (err) {
    console.log("Courses update failed!");
    console.log(err.message);
    process.exit(1);
  }
}


//initiate  the upadte
await updateavailableCourses();

//route handler
export default function courses(req, res) {
 console.log("courses viewed");
 res.json({
   success: true,
   data:availableCourses
  });

}
