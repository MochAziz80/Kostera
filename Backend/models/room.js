'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Room.hasMany(models.Tenant, { foreignKey: 'roomId' });
      Room.hasMany(models.RentHistory, { foreignKey: 'roomId' });    }
  }
  Room.init({
    number: DataTypes.STRING,
    type: DataTypes.STRING,
    price: DataTypes.INTEGER,
    status: DataTypes.STRING,
    notes: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Room',
  });
  return Room;
};