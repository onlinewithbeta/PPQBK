import sharesFunction from "../../functions/shares/shares.functions.js";


async function info(req, res) {
 try {
  const user = req.user;
  console.log(`${user.username} entered shares!`);

  //Find Shares info
  console.log(user.gmail)
  const sharesInfo = await sharesFunction.getHolder(user.gmail);
  const available_shares = 300;
  //const available_shares = await sharesFunction.available_shares();

  // Send the URL back to the client
  return res.status(200).json({
   gmail: sharesInfo.gmail,
   shares: sharesInfo.shares,
   transactions: sharesInfo.transactions,
   available_shares: available_shares,
   /*
   account:{
   	account_number: "9117624342",
   	account_name : "Osisru",
   	bank_name:"Zenith"
   },
   */
   account: sharesInfo.account,


   user: {
    accessToken: user.a,
    wallet: user.w,
    balance: user.b
   },

   message: "Buy A PPQ Shares Today"
  });
 } catch (err) {
  // Handle other errors
  console.error("Error generating signed URL:", err);
  return res.status(500).json({ message: err.message });
 }
}
export default info;
