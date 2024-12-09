import pkg from 'jsonwebtoken';
const { verify } = pkg;
import User from '../model/user.Model.js';

export async function authenticate(req, res, next) {
  const authHeader = req.header('Authorization');
  console.log('Authorization Header:', authHeader);

  const token = authHeader?.split(' ')[1];
  if (!token) {
    console.error('Token not provided');
    return res.status(401).json({ error: 'Access denied' });
  }

  try {
    const decoded = verify(token, process.env.JWT_SECRET);
    console.log('Decoded Token:', decoded);

    const user = await User.findByPk(decoded.id); // Retrieve user from database
    if (!user) {
      console.error('User not found for decoded token ID');
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the user is an admin
    if (user.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden: Admins only' });
    }

    // Attach user to the request object for further use
    req.user = user;
    next();
  } catch (error) {
    console.error('Token Validation Error:', error.message);
    res.status(400).json({ error: 'Invalid token' });
  }
}
