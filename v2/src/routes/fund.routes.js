// routes/users.js
import { Router } from 'express';
const router = Router();

import Fund from '../controllers/fund/fund.controllers.js';
import apikeyMiddleware from '../middleware/accesskey.middlewares.js';

router.use(apikeyMiddleware);

router.get('/funds', Fund.funds);
router.post('/fund', Fund.fund);
router.get('/transactions', Fund.transactions);

export default router;
