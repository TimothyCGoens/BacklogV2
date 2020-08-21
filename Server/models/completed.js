"use strict";
module.exports = (sequelize, DataTypes) => {
  const Completeds = sequelize.define("Completeds", {
    title: DataTypes.STRING,
    startDate: DataTypes.DATE,
    image: DataTypes.STRING,
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
