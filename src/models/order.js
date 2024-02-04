'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Order.init({
    idNhanVien: DataTypes.STRING,
    TenDonHang: DataTypes.STRING,
    idKhachHang: DataTypes.STRING,
    DiaChi: DataTypes.STRING,
    sdt: DataTypes.STRING,
    total:DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};