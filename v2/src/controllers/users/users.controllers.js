


import signup from "./signup.users.controllers.js";
import signin from "./signin.users.controllers.js";
import signout from "./signout.users.controllers.js";

import forgotpassword from "./forgotpassword.users.controllers.js";
import changepassword from "./changepassword.users.controllers.js";

const users = { signup, signin, signout, forgotpassword, changepassword };

export default users;
