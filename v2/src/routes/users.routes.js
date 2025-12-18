// routes/users.js
import { Router } from 'express';
import users from '../controllers/users/users.controllers.js';

const router = Router();

router.post('/signin', users.signin);
router.post('/signup', users.signup);
router.post('/signout', users.signout);

router.post('/forgotpassword', users.forgotpassword);
router.post('/changepassword', users.changepassword);

export default router;
