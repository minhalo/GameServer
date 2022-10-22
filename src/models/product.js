// name: {
//   type: Sequelize.STRING
// },
// title: {
//   type: Sequelize.STRING
// },
// status: {
//   type: Sequelize.INTEGER
// },
// price: {
//   type: Sequelize.INTEGER
// },
// discount: {
//   type: Sequelize.INTEGER
// },
// timeleft: {
//   type: Sequelize.INTEGER
// },
// note: {
//   type: Sequelize.TEXT
// },

'use strict';
const {
  Model, NUMBER, BOOLEAN
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.List, { foreignKey: "listId", as: "arc" })
      // Role.hasOne(models.Role, {foreignKey: "accountId", as: "arc"})

    }
  };
  Product.init({
    name: DataTypes.STRING,
    title: DataTypes.STRING,
    status: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    discount: DataTypes.INTEGER,
    timeleft: DataTypes.INTEGER,
    note: DataTypes.STRING,
    listId: DataTypes.STRING

  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};