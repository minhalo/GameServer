'use strict';
const {
  Model, NUMBER, BOOLEAN
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // // define association here
      // Role.hasOne(models.User, { foreignKey: "RoleId", as: "arc" })
      // // Role.hasOne(models.Role, {foreignKey: "accountId", as: "arc"})
      Role.hasMany(models.Direction, { foreignKey: "roleId", as: "arc" })
      Role.hasOne(models.User, { foreignKey: "roleId", as: "arc2" })

    }
  };
  Role.init({
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Role',
  });
  return Role;
};
