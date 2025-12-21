import createUser from "./create.users.functions.js";
import saveUser from "./save.users.functions.js";
import findUser from "./find.users.functions.js";
import banUser from "./ban.users.functions.js";
import creditUser from "./credit.users.functions.js";
import debitUser from "./debit.users.functions.js";


const usersFunctions = { createUser, saveUser, findUser, banUser, creditUser, debitUser };

export default usersFunctions;