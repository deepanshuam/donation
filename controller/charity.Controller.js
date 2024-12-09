import Charity from '../model/charity.Model.js';

export async function registerCharity(req, res) {
  try {
    const { name, mission, goals } = req.body;
    const charity = await Charity.create({ name, mission, goals, isApproved: true});
    res.status(201).json(charity);
    
  } catch (error) {
    res.status(500).json({ error: 'Charity registration failed' });
  }
}

export async function getCharities(req, res) {
  try {
    const charities = await Charity.findAll({ where: { isApproved: true } });
    res.status(200).json(charities);
    console.log(charities);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch charities' });
  }
}
