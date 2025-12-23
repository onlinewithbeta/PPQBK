

import {
  validationResult,
  body
} from 'express-validator';


 const changepasswordValidator = [
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

  body("otp")
  .isString()
  .trim()
  .withMessage("OTP must be a string")
  .matches(/^\d{6}$/)
  .withMessage("OTP must be a 6-digit number"),

  body("password")
  .isString()
  .isLength({
    min: 8
  })
  .withMessage("Password must be at least 8 characters long")
  .matches(/[A-Z]/)
  .withMessage("Password must contain at least one uppercase letter")
  .matches(/[a-z]/)
  .withMessage("Password must contain at least one lowercase letter")
  .matches(/[0-9]/)
  .withMessage("Password must contain at least one number"),
];

export default changepasswordValidator