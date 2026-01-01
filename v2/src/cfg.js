//configs
// Configuration
const cfg = {
	PORT : process.env.PORT,
	HOST : process.env.HOST,
	
 PQ_FILE_URL: process.env.PQ_FILE_URL,
 PQ_INFO_URL: process.env.PQ_INFO_URL,
 PQDB: process.env.PQDB,
 wk: process.env.wk,
 
 MONGODB:process.env.MONGODB,
 
 paystackKey:process.env.PAYSTACKKEY,
 
 accesscodes: [
  process.env.accesscodes1,
  process.env.accesscodes2,
  process.env.accesscodes3,
  process.env.accesscodes4,
  process.env.accesscodes5,
  process.env.accesscodes6,
  process.env.accesscodes7,
  process.env.accesscodes8,
  process.env.accesscodes9,
  process.env.accesscodes10,
  process.env.accesscodes11
 ]
};

export default cfg;