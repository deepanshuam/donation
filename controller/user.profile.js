import User from '../model/user.Model.js';
import Donation from '../model/donation.Model.js';

export async function getProfile(req, res) {
  try {
    const user = await User.findByPk(req.user.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
}

export async function updateProfile(req, res) {
  try {
    const { name, email,role } = req.body;
    const user = await User.findByPk(req.user.id);

    if (!user) return res.status(404).json({ error: 'User not found' });

    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role || user.role;
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Profile update failed' });
  }
}

export async function getDonationHistory(req, res) {
  try {
    const donations = await Donation.findAll({ where: { userId: req.user.id } });
    res.status(200).json(donations);
    console.log(donations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch donation history' });
  }
}
