import { DataTypes } from 'sequelize';
import sequelize from '../db/index.js';

const User = sequelize.define('User', {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { 
    type: DataTypes.STRING, 
    allowNull: false, 
    defaultValue: 'user'  // Default to 'user' if not provided
  },
});

export default User;
