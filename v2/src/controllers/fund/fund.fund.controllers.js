export default async function fund(req,res){
	const user = req.user;
	const balance = user.wallet.balance + user.wallet.fake_balance;
	
	res.json({
		success:true,
		message:`You have ${balance} coins`,
		balance:balance
	});
}