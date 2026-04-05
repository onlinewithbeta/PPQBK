import https from "https";
import cfg from "../../cfg.js";

// Fund function (ES6)
async function requestFunding(gmail = "test1@gmail.com", amount = 500) {
 //Infomation about payment
 const params = JSON.stringify({
  metadata: {
   guide: {
    command: "buyshares",
    email: gmail,
    amount: amount // amount in naira
   }
  },
  email: gmail,
  amount: amount * 100 * 1100 // amount in kobo => naira => shares value
 });

 //Infomation about where to pay to
 const options = {
  hostname: "api.paystack.co",
  port: 443,
  path: "/transaction/initialize",
  method: "POST",
  headers: {
   //Authorization: `Bearer ${cfg.payKey}`,
   Authorization: `Bearer ${cfg.paystackKey}`,
   "Content-Type": "application/json"
  }
 };
 //The result from paystack
 let fundingRes;

 //Make the request
 return new Promise((resolve, reject) => {
  const req = https.request(options, res => {
   let data = "";

   res.on("data", chunk => {
    data += chunk;
   });

   res.on("end", () => {
    try {
     fundingRes = JSON.parse(data); //The result

     //inner failure
     if (!fundingRes.status) {
      console.log("Paystack response:", fundingRes);
      reject(new Error(fundingRes.message));
     }
     //resolve Promise
     resolve(fundingRes);
     return fundingRes;
    } catch (error) {
     reject(new Error(`Failed to parse response: ${error.message}`));
    }
   });
  });

  //Unsuccessful charge
  req.on("error", error => {
   console.error("Request error:", error);
   reject(error);
  });

  req.write(params);
  req.end();
 });

 const paystackMockResponse = {
  status: true,
  message: "Authorization URL created",
  data: {
   authorization_url: "https://checkout.paystack.com/c1afhji6bhgvvi9",
   access_code: "c1afhji6bhgvvi9",
   reference: "r1cprjj8za"
  }
 };

 console.log("Paystack had response:", fundingRes);
}

export default async function chargeUser(gmail, amount) {
 const paymentRes = await requestFunding(gmail, amount);

 return {
  access_code: paymentRes.data.access_code,
  reference: paymentRes.data.reference
 };
}
