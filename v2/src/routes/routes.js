import {Router} from 'express';
import pqRoutes from './pq.routes.js';
import pdfRoutes from './pdf.routes.js';
import usersRoutes from './users.routes.js';
import fundRoutes from './fund.routes.js';
import sharesRoutes from './shares.routes.js';

const router = Router();

router.use('/pq',pqRoutes);
router.use('/pdf',pdfRoutes);
router.use('/users',usersRoutes);
router.use('/fund',fundRoutes);
router.use('/shares',sharesRoutes);

//seperated ...
router.use('/owb',pqRoutes);
router.use('/osiaruai',pqRoutes);

export default router