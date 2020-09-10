"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      "UserFeeds",
      "destination",
      Sequelize.STRING
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(
      "UserFeeds",
      "destination",
      Sequelize.STRING
    );
  },
};
