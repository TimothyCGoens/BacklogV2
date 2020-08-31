"use strict";
module.exports = (sequelize, DataTypes) => {
  const Wishlists = sequelize.define("Wishlists", {
    gameId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    image: DataTypes.STRING,
    platform: DataTypes.STRING,
    releaseDate: DataTypes.DATE,
  });
  Wishlists.associate = function (models) {
    Wishlists.belongsTo(models.Users, {
      as: "user",
      foreignKey: "id",
      onDelete: "CASCADE",
    });
  };
  return Wishlists;
};
