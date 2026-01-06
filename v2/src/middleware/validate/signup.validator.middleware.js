import { body } from "express-validator";

const signupValidator = [
 body("username")
  .isString()
  .trim()
  .isLength({
   min: 3,
   max: 30
  })
  .withMessage("Username must be between 3 and 20 characters")
  .matches(/^[a-zA-Z0-9_]+$/)
  .withMessage("Username can only contain letters, numbers, and underscores"),

 body("gmail")
  .isEmail()
  .trim()
  .withMessage("Please provide a valid Gmail address")
  .custom(value => {
   if (!value.endsWith("@gmail.com")) {
    throw new Error("Email must be a Gmail address");
   }
   return true;
  }),

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

 body("phone")
  .isString()
  .trim()
  .matches(/^\d{10}$/)
  .withMessage("Phone number must be a 10-digit string"),

 body("faculty")
  .isString()
  .trim()
  .isLength({
   min: 3,
   max: 10
  })
  .withMessage("Please use an abbrevation like SSLT, BMS, ENG,etc...")
  .matches(/^[a-zA-Z]+$/)
  .withMessage("Faculty can only contain letters"),

 body("department")
  .isString()
  .trim()
  .isLength({
   min: 3,
   max: 10
  })
  .withMessage("Please use an abbrevation like BCT, PHARM, ELECT,etc...")
  .matches(/^[a-zA-Z]+$/)
  .withMessage("Department can only contain letters"),

 body("matno")
  .isString()
  .trim()
  .isLength({
    min: 3,
    max: 20
  })
  .withMessage("Mat. no must be between 3 and 20 characters")
  // Updated Regex below: added \/ inside the brackets
  .matches(/^[a-zA-Z0-9_\/]+$/)
  .withMessage("Mat. no can only contain letters, numbers, and slashes")
];

export default signupValidator;
