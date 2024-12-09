import { Router } from 'express';
import { getProfile, updateProfile, getDonationHistory } from '../controller/user.profile.js';
import { authenticate } from '../middleware/auth.Middleware.js';
const router = Router();

router.get('/profile', authenticate, getProfile);
router.put('/update', authenticate, updateProfile);
router.get('/donations', authenticate, getDonationHistory);

export default router;
