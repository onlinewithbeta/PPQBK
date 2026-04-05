import sharesFunction from "../../functions/shares/shares.functions.js";


async function info(req, res) {
 try {
  const user = req.user;
 
  console.log(`${user.username} entered shares!`);

  //Find Shares info
  const sharesInfo = await sharesFunction.getHolder(user.gmail);
  const available_shares = sharesInfo.available_shares
  
  // Send the URL back to the client
  return res.status(200).json({
   gmail: sharesInfo.gmail,
   shares: sharesInfo.shares,
   transactions: sharesInfo.transactions,
   available_shares: available_shares,
   account: sharesInfo.account,


   user: {
    accessToken: user.sensetive.accessToken,
    wallet: user.wallet.address,
    balance: user.wallet.balance
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
