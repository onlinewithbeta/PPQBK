
export default async function funds(req,res){
	const user = req.user;
	
	res.json({
		success:true,
		message:`Your transactions.`,
		transactions:user.transactions
	});
}