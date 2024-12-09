import Donation from '../model/donation.Model.js';
import Charity from '../model/charity.Model.js';

// Admin: View all donations
export async function viewDonations(req, res) {
  try {
    const donations = await Donation.findAll();
    res.status(200).json(donations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch donations' });
  }
}

// Admin: View donations for a specific charity
export async function viewDonationsByCharity(req, res) {
  const { charityId } = req.params;
  try {
    const donations = await Donation.findAll({ where: { charityId } });
    res.status(200).json(donations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch donations for this charity' });
  }
}

// Admin: Approve/Reject a charity
export async function approveCharity(req, res) {
  const { charityId } = req.params;
  try {
    const charity = await Charity.findByPk(charityId);
    if (!charity) {
      return res.status(404).json({ error: 'Charity not found' });
    }

    // Update charity approval status
    charity.isApproved = true;  // Set the approval status to true
    await charity.save();
    res.status(200).json({ message: 'Charity approved' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to approve charity' });
  }
}

// Admin: Reject a charity
export async function rejectCharity(req, res) {
  const { charityId } = req.params;
  try {
    const charity = await Charity.findByPk(charityId);
    if (!charity) {
      return res.status(404).json({ error: 'Charity not found' });
    }

    // Update charity approval status
    charity.isApproved = false;  // Set the approval status to false
    await charity.save();
    res.status(200).json({ message: 'Charity rejected' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to reject charity' });
  }
}

// Admin: Create a new charity
export async function createCharity(req, res) {
  const { name, description, category } = req.body;
  try {
    const newCharity = await Charity.create({ name, description, category, isApproved: false });
    res.status(201).json(newCharity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create charity' });
  }
}

// Admin: Delete a charity
export async function deleteCharity(req, res) {
  const { charityId } = req.params;
  try {
    const charity = await Charity.findByPk(charityId);
    if (!charity) {
      return res.status(404).json({ error: 'Charity not found' });
    }

    await charity.destroy();
    res.status(200).json({ message: 'Charity deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete charity' });
  }
}
