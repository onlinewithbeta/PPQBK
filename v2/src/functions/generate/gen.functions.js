
import timeFunc from "../generate/moment.gen.functions.js";
import generateApiKey from "../generate/keys.gen.functions.js";
import randomDigits from "../generate/otp.gen.functions.js";
import passwordFunc from "../generate/password.gen.functions.js";
import genWalletAddress from "../generate/wallet.gen.functions.js";

const gen = {timeFunc,generateApiKey,genWalletAddress, randomDigits,passwordFunc};

export default gen;