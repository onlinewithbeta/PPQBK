import axios from "axios";
import mongoose from "mongoose";
import cfg from "../../cfg.js";

const { PQ_FILE_URL, PQ_INFO_URL } = cfg;

const accesscodes = cfg.accesscodes;
let currentAccessCode = await selectAccesscode();
//get good access accesscode


async function checkLimit(accesscode) {
 //checker of limts
 let checker = axios.create({
  baseURL: PQ_INFO_URL,
  headers: {
   "User-Agent": "PPQ ACCESS",
   Authorization: `token ${accesscode}`
  }
 });

 //access_limit
 let access_limit = await checker.get("/rate_limit");
 access_limit = access_limit.data.resources.core.remaining;

 console.log(`Available trail is ${access_limit}`);
 if (access_limit > 5) {
  //access_limit is high
  return true;
 } else {
  //access_limit is low
  return false;
 }
}

export async function selectAccesscode(c = 9) {
 for (let accesscode of accesscodes) {
  const accessible = await checkLimit(accesscode);
  if (accessible) return accesscode;
  console.log('Not accessible')
 }
}

export const createPqInfo = (token) => axios.create({
  baseURL: PQ_INFO_URL,
  headers: {
    "User-Agent": "Express.js PPQ API Client",
    Authorization: `token ${token}`
  }
});

export const createPqFiles = (token) => axios.create({
  baseURL: PQ_FILE_URL,
  headers: {
    Accept: "application/vnd.github.v3.raw",
    "User-Agent": "Express.js PPQ API Client",
    Authorization: `token ${token}`
  }
});