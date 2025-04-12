'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Payment.belongsTo(models.Tenant, { foreignKey: 'tenantId' });
    }
  }
  Payment.init({
    tenantId: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    date: DataTypes.DATE,
    method: DataTypes.STRING,
    notes: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Payment',
  });
  return Payment;
};