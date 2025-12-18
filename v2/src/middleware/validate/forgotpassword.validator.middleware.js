
import {
  body
} from 'express-validator';


export const forgotpasswordValidator = [
  body("gmail")
  .isString()
   .trim()
  .withMessage("Gmail must be a string")
  .isEmail()
 
  .withMessage("Please provide a valid email address")
  .custom((value) => {
    if (!value.toLowerCase().endsWith("@gmail.com")) {
      throw new Error("Email must be a Gmail address");
    }
    return true;
  }),
];


export default forgotpasswordValidator
