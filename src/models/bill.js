'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Bill.init({
    idThuCung:DataTypes.STRING,
    idNhanVien:DataTypes.STRING,
    soLuong: DataTypes.STRING,
    donGia: DataTypes.STRING,
    status:DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Bill',
  });
  return Bill;
};