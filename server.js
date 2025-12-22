import mongoose from "mongoose"

import app from './v2/app.js';
import cfg from './v2/src/cfg.js';
//import connectDB from './v2/src/functions/mongoose/connectdb.mongoose.js';

const PORT = cfg.PORT || 3000;
const HOST ='localhost';

// Start the server
const server = app.listen(PORT, HOST,async () => {

	try{
    console.log("successful to connection");
    await mongoose.connect(cfg.MONGODB);
    console.log("successful to connection");
	}catch(err){
    console.log("Failure to connection");
	}
	
    console.log(`Sever running on http://${HOST}:${PORT}`);
    console.log(`📁 E..nvironment: ${process.env.NODE_ENV || 'development'}`);
});
