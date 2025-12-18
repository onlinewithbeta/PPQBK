import {Router} from 'express';
import pqRoutes from './pq.routes.js';
import usersRoutes from './users.routes.js';

const router = Router();

router.use('/pq',pqRoutes);
router.use('/users',usersRoutes);
router.use('/owb',pqRoutes);
router.use('/osiaruai',pqRoutes);

export default router