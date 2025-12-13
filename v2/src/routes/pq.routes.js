// routes/users.js
import { Router } from 'express';
import courses from '../controllers/PQs/courses.pq.controllers.js';
import sessions from '../controllers/PQs/sessions.pq.controllers.js';
import paper from '../controllers/PQs/paper.pq.controllers.js';


const router = Router();

router.get('/courses', courses);

router.get('/sessions', sessions);

router.get('/paper', paper);



export default router;