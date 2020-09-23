"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Games", "platformFamily", Sequelize.STRING);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(
      "Games",
      "platformFamily",
      Sequelize.STRING
    );
  },
};
