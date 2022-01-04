'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Current extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Current.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    } ,
    price:{
      type: DataTypes.REAL,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Current',
  });
  return Current;
};