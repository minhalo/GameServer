'use strict';
const {
    Model, NUMBER, BOOLEAN
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Direction extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Direction.belongsTo(models.Role, { foreignKey: "roleId", as: "arc" })
        }
    };
    Direction.init({
        path: DataTypes.STRING,
        roleId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Direction',
    });
    return Direction;
};
