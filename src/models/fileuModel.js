'use strict';
const {
    Model, NUMBER, BOOLEAN
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Fileu extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Fileu.hasMany(models.User, { foreignKey: "fileuId", as: "file" })
        }
    };
    Fileu.init({
        path: DataTypes.STRING,
        name: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Fileu',
    });
    return Fileu;
};
