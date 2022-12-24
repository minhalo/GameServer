'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Genders', [{
      name: 'Male',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    await queryInterface.bulkInsert('Genders', [{
      name: 'Female',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Genders', null, { where: { nameRole: 'Male' } });
    await queryInterface.bulkDelete('Genders', null, { where: { nameRole: 'Female' } });
  }
};
