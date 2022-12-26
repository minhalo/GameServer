'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING
            },
            age: {
                type: Sequelize.INTEGER
            },
            status: {
                type: Sequelize.INTEGER
            },
            gmail: {
                type: Sequelize.STRING
            },
            coin: {
                type: Sequelize.INTEGER
            },
            purchaseCoin: {
                type: Sequelize.INTEGER
            },
            password: {
                type: Sequelize.STRING
            },
            accessToken: {
                type: Sequelize.TEXT
            },
            refreshToken: {
                type: Sequelize.TEXT
            },
            activated: {
                type: Sequelize.INTEGER
            },


            fileuId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Fileus",
                    key: "id"
                }
            },
            roleId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Roles",
                    key: "id"
                }
            },
            addressId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Addresses",
                    key: "id"
                }
            },
            genderId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Genders",
                    key: "id"
                }
            },


            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Users');
    }
};
