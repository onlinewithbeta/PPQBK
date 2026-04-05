//cont avaShs

async function bank_details(req, res) {
 try {
  const user = req.user;
  const bank_detail = req.body;
  console.log(`${user.username} wants to add bank details!`);

  //Find Shares info
  //const sharesInfo = await getSharesInfosharesInfo(user.gmail)
//await add_details ( )  //sharesInfo.bank_details = bank_detail

  // Send the URL back to the client
  console.log(bank_detail)
  return res.status(200).json(bank_detail);
  
 } catch (err) {
  // Handle other errors
  console.error("Error in buying shares:", err);
  return res.status(500).json({ message: err.message });
 }
}
export default bank_details;
