import { DataTypes } from 'sequelize';
import sequelize from '../db/index.js';

const Charity = sequelize.define('Charity', {
  name: { type: DataTypes.STRING, allowNull: false },
  mission: { type: DataTypes.TEXT },
  goals: { type: DataTypes.TEXT },
  isApproved: { type: DataTypes.BOOLEAN, defaultValue: false },
});

export default Charity;
