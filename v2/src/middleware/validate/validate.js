import {
  validationResult,
  body
} from 'express-validator';

//User validator
import signupValidator from './signup.validator.middleware.js';
import signinValidator from './signin.validator.middleware.js';
import signoutValidator from './signout.validator.middleware.js';
import forgotpasswordValidator from './forgotpassword.validator.middleware.js';
import changepasswordValidator from './changepassword.validator.middleware.js';

//handle the validation
import handleValidation from './handle.validator.middleware.js';

//The validator Object
const validator = {
	signupValidator:signupValidator,
	signinValidator:signinValidator,
	signoutValidator:signoutValidator,
	forgotpasswordValidator:forgotpasswordValidator,
	changepasswordValidator:changepasswordValidator,
	handleValidation:handleValidation
};

export default validator;













//Buy
export const buyAirtimeValidator = [
  body('network')
  .trim()
  .toLowerCase()
  .isIn(['mtn', 'airtel', 'glo'])
  .withMessage('Network must be one of: mtn, airtel, glo'),

  body('amount')
  .isFloat({
    min: 99
  }) // strictly greater than 100
  .withMessage('Amount must be greater than 100'),

  body('phone')
  .trim()
  .matches(/^\d{10}$/)
  .withMessage('Phone must be an 10-digit numeric string'),
];
export const buyDataValidator = [
  body('network')
  .trim()
  .isIn(['mtn', 'airtel', 'glo'])
  .withMessage('Network must be one of: mtn, airtel, glo'),

  body('planId')
  .isInt({
    min: 1, max: 200
  })
  .withMessage('planId must be an integer between 1 and 200'),

  body('phone')
  .trim()
  .matches(/^\d{10}$/)
  .withMessage('Phone must be an 10-digit numeric string'),
];

//fund
export const amountValidator = [
  body('amount')
  .isFloat({
    min: 99
  }) // strictly greater than 100
  .withMessage('Amount must be greater than 100')
];

//auth



