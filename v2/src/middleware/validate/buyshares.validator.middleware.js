import { validationResult, body } from "express-validator";

const buysharesValidator = [
 body("amount")
  .trim()
  .matches(/[0-9]/)
  .withMessage("amount must contain only numbers")
];

export default buysharesValidator;
