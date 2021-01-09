"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Products",
      [
        {
          name: "Satu",
          price: 100000,
          descriptions: "Satu",
          stock: 10,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /*
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
