import userFunctions from "../../functions/users/users.functions.js";

export default async function fund(req, res) {
 const user = req.user;

 const amount = req.body.amount;
 const gmail = user.gmail;

 const requestFund = await userFunctions.chargeUser(gmail, amount);

 //hit wk

 //save as pending
 let pendingTransacion = {
  type: "funding",
  cost: amount,
  description: `Funding account with ${amount} naira`,
  status: "pending",
  date: {
   initiated: Date.now,
   verified: null
  },
  new_balance: user.wallet.balance + user.wallet.fake_balance + amount,
  old_balance: user.wallet.balance + user.wallet.fake_balance,
  id: requestFund.reference
 };

 user.transactions.unshift(pendingTransacion);

 await userFunctions.saveUser(user);

 res.json({
  success: true,
  message: "Url to make payments",
  url: `https://checkout.paystack.com/${requestFund.access_code}`,
  reference: requestFund.reference
 });
}
