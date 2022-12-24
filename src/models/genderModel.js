'use strict';
const {
    Model, NUMBER, BOOLEAN
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Gender extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Gender.hasOne(models.User, { foreignKey: "genderId", as: "arc1" })
        }
    };
    Gender.init({
        name: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Gender',
    });
    return Gender;
};
