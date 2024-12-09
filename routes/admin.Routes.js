import express from 'express';
import { viewDonations, viewDonationsByCharity, approveCharity, rejectCharity, createCharity, deleteCharity } from '../controller/admin.Controller.js';
import { authenticate}  from '../middleware/auth.Middleware.js';  // Import the authMiddleware

const router = express.Router();

// Admin Routes for Donations
// These routes will only be accessible to authenticated admins
router.get('/donations', authenticate, viewDonations);  // View all donations
router.get('/donations/charity/:charityId', authenticate, viewDonationsByCharity);  // View donations by charity

// Admin Routes for Charities
router.post('/charity', authenticate, createCharity);  // Create a new charity
router.put('/charity/approve/:charityId', authenticate, approveCharity);  // Approve a charity
router.put('/charity/reject/:charityId', authenticate, rejectCharity);  // Reject a charity
router.delete('/charity/:charityId', authenticate, deleteCharity);  // Delete a charity

export default router;
