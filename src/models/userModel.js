'use strict';
const {
    Model, NUMBER, BOOLEAN
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // // define association here
            // Role.hasOne(models.User, { foreignKey: "RoleId", as: "arc" })
            // // Role.hasOne(models.Role, {foreignKey: "accountId", as: "arc"})
            User.belongsTo(models.Gender, { foreignKey: "genderId", as: "gender" })
            User.belongsTo(models.Role, { foreignKey: "roleId", as: "role" })
            User.belongsTo(models.Address, { foreignKey: "addressId", as: "address" })
            User.belongsTo(models.Fileu, { foreignKey: "fileuId", as: "file" })

        }
    };
    User.init({
        name: DataTypes.STRING,
        age: DataTypes.INTEGER,
        status: DataTypes.INTEGER,
        gmail: DataTypes.STRING,
        coin: DataTypes.INTEGER,
        purchaseCoin: DataTypes.INTEGER,
        password: DataTypes.STRING,
        accessToken: DataTypes.TEXT,
        refreshToken: DataTypes.TEXT,
        fileuId: DataTypes.INTEGER,
        activated: DataTypes.INTEGER,
        roleId: DataTypes.INTEGER,
        addressId: DataTypes.INTEGER,
        genderId: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};
