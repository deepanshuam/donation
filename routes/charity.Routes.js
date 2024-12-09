

import { Router } from 'express';
import { registerCharity, getCharities } from '../controller/charity.Controller.js';
import { authenticate } from '../middleware/auth.Middleware.js';
const router = Router();

router.post('/register', authenticate, registerCharity);
router.get('/', getCharities);

export default router;
