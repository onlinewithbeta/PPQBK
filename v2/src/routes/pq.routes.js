// routes/users.js
import { Router } from 'express';
import pq from '../controllers/PQs/pq.controllers.js';
import apikeyMiddleware from '../middleware/accesskey.middlewares.js';
const router = Router();

router.get('/courses', pq.courses);
//MOVE BACK apikey access.
router.get('/sessions', pq.sessions);
router.use(apikeyMiddleware)
router.get('/paper', pq.paper);
router.post('/subjectivemaker', pq.subjectivemaker);

export default router;
