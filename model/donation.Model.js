import { DataTypes } from 'sequelize';
import sequelize from '../db/index.js';

const Donation = sequelize.define('Donation', {
  amount: { type: DataTypes.FLOAT, allowNull: false },
  paymentId: { type: DataTypes.STRING, allowNull: false },
});

export default Donation;
