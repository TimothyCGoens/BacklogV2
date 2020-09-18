"use strict";
module.exports = (sequelize, DataTypes) => {
  const Games = sequelize.define("Games", {
    gameId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    image: DataTypes.STRING,
    platform: DataTypes.STRING,
    releaseDate: DataTypes.DATE,
    genre: DataTypes.STRING,
    backlog: DataTypes.BOOLEAN,
    wishlist: DataTypes.BOOLEAN,
    playing: DataTypes.BOOLEAN,
    completed: DataTypes.BOOLEAN,
    backlogDate: DataTypes.DATE,
    startPlayingDate: DataTypes.DATE,
    stopPlayingDate: DataTypes.DATE,
    completedDate: DataTypes.DATE,
    rating: DataTypes.INTEGER,
  });
  Games.associate = function (models) {
    Games.belongsTo(models.Users, {
      as: "user",
      foreignKey: "id",
      onDelete: "CASCADE",
    });
  };
  return Games;
};
