"use strict";
module.exports = (sequelize, DataTypes) => {
  const Backlogs = sequelize.define("Backlogs", {
    title: DataTypes.STRING,
    image: DataTypes.STRING,
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
