import {Router} from 'express';
import pqRoutes from './pq.routes.js';

const router = Router();

router.use('/pq',pqRoutes);
router.use('/user',pqRoutes);
router.use('/owb',pqRoutes);
router.use('/osiaruai',pqRoutes);

export default router