"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Games", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
      },
      gameId: {
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      },
      image: {
        type: Sequelize.STRING,
      },
      platform: {
        type: Sequelize.STRING,
      },
      releaseDate: {
        type: Sequelize.DATE,
      },
      backlog: {
        type: Sequelize.BOOLEAN,
      },
      wishlist: {
        type: Sequelize.BOOLEAN,
      },
      playing: {
        type: Sequelize.BOOLEAN,
      },
      completed: {
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Games");
  },
};
