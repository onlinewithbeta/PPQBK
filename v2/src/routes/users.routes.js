// routes/users.js
import { Router } from 'express';
import users from '../controllers/users/users.controllers.js';
import validator from '../middleware/validate/validate.js';

const router = Router();

router.post('/signin',validator.signinValidator,validator.handleValidation, users.signin);
router.post('/signup', validator.signupValidator, validator.handleValidation, users.signup);
router.post('/signout', users.signout);

router.post('/forgotpassword', users.forgotpassword);
router.post('/changepassword', users.changepassword);

export default router;
