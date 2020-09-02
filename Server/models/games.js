"use strict";
module.exports = (sequelize, DataTypes) => {
  const Games = sequelize.define("Games", {
    gameId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    image: DataTypes.STRING,
    platform: DataTypes.STRING,
    releaseDate: DataTypes.DATE,
    backlog: DataTypes.BOOLEAN,
    wishlist: DataTypes.BOOLEAN,
    completed: DataTypes.BOOLEAN,
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
