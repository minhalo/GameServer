'use strict';
const {
    Model, NUMBER, BOOLEAN
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Address extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Address.hasOne(models.User, { foreignKey: "addressId", as: "address" })
        }
    };
    Address.init({
        name: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Address',
    });
    return Address;
};
