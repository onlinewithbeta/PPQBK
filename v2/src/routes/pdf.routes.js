import multer from "multer";


// routes/users.js
import { Router } from 'express';
import pdf from '../controllers/pdf/pdf.controllers.js';
import apikeyMiddleware from '../middleware/accesskey.middlewares.js';

//const
const router = Router();
const upload = multer({ 
  dest: 'uploads/' // Temporary directory for uploaded files
});

//endpoints
//router.get('/', pdf.list);

router.use(apikeyMiddleware)
router.get('/:id', pdf.view);
router.post('/upload', upload.single("pdf"), pdf.post);

///////////////router.delete('/pdf/:id', pq.deletePdf);


export default router;
