"use strict";
module.exports = (sequelize, DataTypes) => {
  const Games = sequelize.define(
    "Games",
    {
      title: DataTypes.STRING,
      coverArt: DataTypes.STRING,
    },
    {}
  );
  Games.associate = function (models) {
    Games.belongsTo(models.Users, {
      as: "user",
      foreignKey: "id",
      onDelete: "CASCADE",
    });
  };
  return Games;
};
