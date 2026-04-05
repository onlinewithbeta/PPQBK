import { validationResult, body } from "express-validator";

const bank_detailsValidator = [
 body("bank_name").isString().trim().withMessage("Bank Name must be a string"),

 body("account_number")
  .isString()
  .trim()
  .withMessage("Account Number must be a string")
  .matches(/^\d{10}$/)
  .withMessage("Account Number must be a 10-digit number"),

 body("account_name")
  .isString()
  .trim()
  .withMessage("Account Name must be a string")
];

export default bank_detailsValidator;
