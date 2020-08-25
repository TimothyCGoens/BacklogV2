"use strict";
module.exports = (sequelize, DataTypes) => {
  const Wishlists = sequelize.define("Wishlists", {
    title: DataTypes.STRING,
    image: DataTypes.STRING,
    gameId: DataTypes.INTEGER,
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
