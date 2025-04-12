'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tenant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Tenant.belongsTo(models.User, { foreignKey: 'userId' });
      Tenant.belongsTo(models.Room, { foreignKey: 'roomId' });
      Tenant.hasMany(models.Payment, { foreignKey: 'tenantId' });
      Tenant.hasMany(models.RentHistory, { foreignKey: 'tenantId' });    }
  }
  Tenant.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    roomId: DataTypes.INTEGER,
    status: DataTypes.STRING,
    rentDue: DataTypes.DATE,
    payment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Tenant',
  });
  return Tenant;
};