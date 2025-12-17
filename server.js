import app from './v2/app.js';
import cfg from './v2/src/cfg.js';

const PORT = cfg.PORT || 3000;
const HOST = cfg.HOST || 'localhost';

// Start the server
const server = app.listen(PORT, HOST, () => {
    console.log(`🚀 Server running at:`);
    console.log(`   Local: http://${HOST}:${PORT}`);
    console.log(`📁 Environment: ${process.env.NODE_ENV || 'development'}`);
});
