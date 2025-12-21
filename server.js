import app from './v2/app.js';
import cfg from './v2/src/cfg.js';
import connectDB from './v2/src/functions/mongoose/connectdb.mongoose.js';

const PORT = cfg.PORT || 3000;
const HOST ='localhost';
	await connectDB;

// Start the server
const server = app.listen(PORT, HOST,async () => {
    console.log(`Sever running on http://${HOST}:${PORT}`);
    console.log(`📁 E..nvironment: ${process.env.NODE_ENV || 'development'}`);
});
