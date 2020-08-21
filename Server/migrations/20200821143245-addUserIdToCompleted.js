"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Completeds", "userId", Sequelize.STRING);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      "Completeds",
      "userId",
      Sequelize.STRING
    );
  },
};
