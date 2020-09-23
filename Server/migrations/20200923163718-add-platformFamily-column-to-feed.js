"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      "UserFeeds",
      "platformFamily",
      Sequelize.STRING
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(
      "UserFeeds",
      "platformFamily",
      Sequelize.STRING
    );
  },
};
