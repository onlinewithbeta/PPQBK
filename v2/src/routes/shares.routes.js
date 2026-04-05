// routes/users.js
import { Router } from 'express';
import apikeyMiddleware from '../middleware/accesskey.middlewares.js';
import shares from '../controllers/shares/shares.controllers.js';
import validator from '../middleware/validate/validate.js';

const router = Router();



router.use(apikeyMiddleware)
router.get('/',shares.info);
router.post('/buy',validator.buysharesValidator, validator.handleValidation, shares.buy);
router.post('/bank_details', validator.bank_detailsValidator, validator.handleValidation, shares.bank_details);

export default router;
