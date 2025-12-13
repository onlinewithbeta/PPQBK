import app from './v2/app.js';




const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

// Start the server
const server = app.listen(PORT, HOST, () => {
    console.log(`🚀 Server running at:`);
    console.log(`   Local: http://${HOST}:${PORT}`);
    console.log(`📁 Environment: ${process.env.NODE_ENV || 'development'}`);
      //  process.exit(0);
});
