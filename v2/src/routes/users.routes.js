// routes/users.js
import { Router } from 'express';
import users from '../controllers/users/users.controllers.js';
import validator from '../middleware/validate/validate.js';

const router = Router();

router.all('/',(req,res)=>{
	res.status(200).json({
		message:"User Auth route"
	})
});
router.post('/signin',validator.signinValidator,validator.handleValidation, users.signin);
router.post('/signup', validator.signupValidator, validator.handleValidation, users.signup);
router.post('/signout', users.signout);

router.post('/forgotpassword', validator.forgotpasswordValidator, validator.handleValidation, users.forgotpassword);
router.post('/changepassword', validator.changepasswordValidator, validator.handleValidation, users.changepassword);

export default router;
