import cfg from "../../cfg.js";
import userFunctions from "../../functions/users/users.functions.js";
import sharesFunction from "../../functions/shares/shares.functions.js";

async function buyshares(req, res) {
 try {
  const user = req.user;
  const amount = Number(req.body.amount);
  const gmail = user.gmail;

  console.log(`${user.username} wants to buy ${amount} shares!`);
  const requestShares = await sharesFunction.reqShares(gmail, amount);

  //save as pending
  let pendingTransacion = {
   type: "Buy Shares",
   cost: amount * 1100,
   description: `Buying ${amount} shares for 1,100 naira`,
   status: "pending",
   date: {
    initiated: Date.now,
    verified: null
   },
   new_balance: user.wallet.balance + user.wallet.fake_balance,
   old_balance: user.wallet.balance + user.wallet.fake_balance,
   id: requestShares.reference
  };

  user.transactions.unshift(pendingTransacion);

  await userFunctions.saveUser(user);

  // Send the URL back to the client
  res.json({
   success: true,
   message: "Url to make payments",
   url: `https://checkout.paystack.com/${requestShares.access_code}`,
   reference: requestShares.reference
  });
 } catch (err) {
  // Handle other errors
  console.error("Error in buying shares:", err);
  return res.status(500).json({ message: err.message });
 }
}
export default buyshares;
