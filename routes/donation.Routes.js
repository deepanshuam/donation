import { Router } from 'express';
import { donate } from '../controller//donation.Controller.js';
import { authenticate } from '../middleware/auth.Middleware.js';
const router = Router();

router.post('/', authenticate, donate);

export default router;
