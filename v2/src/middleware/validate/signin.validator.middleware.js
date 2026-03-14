import {
  body
} from 'express-validator';


const signinValidator = [
  body("password")
  .isString()
  .isLength({
    min: 8
  })
  .withMessage("Password must be at least 8 characters long"),

  body("useGmail")
  .isBoolean()
  .withMessage("useGmail must be a boolean"),

  body("useUsername")
  .isBoolean()
  .withMessage("useUsername must be a boolean"),
  
  body("usePhone")
  .isBoolean()
  .withMessage("usePhone must be a boolean"),

  body("identifier")
  .trim()
  .custom((value, {
    req
  }) => {
    if (req.body.useGmail) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        throw new Error("Please input your Gmail");
      }
    } else if (req.body.useUsername) {
      if (!/^[a-zA-Z0-9_]{3,20}$/.test(value)) {
        throw new Error("Please input your username (3–20 chars, alphanumeric/underscore)");
      }
    }else if (req.body.usePhone) {
    	if (!/^[0-9]{10}$/.test(value)) {
        throw new Error("Please input your phone number, and remove the first zero(0) ");
      }
    }else {
      throw new Error("Either useGmail,  useUsername or usePhone must be true");
    }
    return true;
  }),
];

export default signinValidator