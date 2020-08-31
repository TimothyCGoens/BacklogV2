"use strict";
module.exports = (sequelize, DataTypes) => {
  const Completeds = sequelize.define("Completeds", {
    userId: DataTypes.INTEGER,
    gameId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    startDate: DataTypes.DATE,
    image: DataTypes.STRING,
    platform: DataTypes.STRING,
    releaseDate: DataTypes.DATE,
  });
  Completeds.associate = function (models) {
    Completeds.belongsTo(models.Users, {
      as: "user",
      foreignKey: "id",
      onDelete: "CASCADE",
    });
  };
  return Completeds;
};
