'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RentHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      RentHistory.belongsTo(models.Tenant, { foreignKey: 'tenantId' });
      RentHistory.belongsTo(models.Room, { foreignKey: 'roomId' });    }
  }
  RentHistory.init({
    tenantId: DataTypes.INTEGER,
    roomId: DataTypes.INTEGER,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'RentHistory',
  });
  return RentHistory;
};