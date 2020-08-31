"use strict";
module.exports = (sequelize, DataTypes) => {
  const Backlogs = sequelize.define("Backlogs", {
    gameId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    image: DataTypes.STRING,
    platform: DataTypes.STRING,
    releaseDate: DataTypes.DATE,
  });
  Backlogs.associate = function (models) {
    Backlogs.belongsTo(models.Users, {
      as: "user",
      foreignKey: "id",
      onDelete: "CASCADE",
    });
  };
  return Backlogs;
};
