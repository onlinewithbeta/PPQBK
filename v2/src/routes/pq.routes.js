// routes/users.js
import { Router } from 'express';
import pq from '../controllers/PQs/pq.controllers.js';

const router = Router();

router.get('/courses', pq.courses);
router.get('/sessions', pq.sessions);
router.get('/paper', pq.paper);

export default router;
