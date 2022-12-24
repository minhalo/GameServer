'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Addresses', [{
      name: 'Ha Noi',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    await queryInterface.bulkInsert('Addresses', [{
      name: 'Nam Tu Liem',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Addresses', null, { where: { nameRole: 'Ha Noi' } });
    await queryInterface.bulkDelete('Addresses', null, { where: { nameRole: 'Nam Tu Liem' } });
  }
};
