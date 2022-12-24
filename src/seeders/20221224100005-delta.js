'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Fileus', [{
      path: '/home/minh/Documents/GameServerConfig/GameServer/src/assets/avatar/male.png',
      name: 'male.png',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    await queryInterface.bulkInsert('Fileus', [{
      path: '/home/minh/Documents/GameServerConfig/GameServer/src/assets/avatar/female.png',
      name: 'female.png',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
