"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("UserFeeds", "platform", Sequelize.STRING);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(
      "UserFeeds",
      "platform",
      Sequelize.STRING
    );
  },
};
