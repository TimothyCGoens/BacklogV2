"use strict";
module.exports = (sequelize, DataTypes) => {
  const Completed = sequelize.define("Completed", {
    title: DataTypes.STRING,
    startDate: DataTypes.DATE,
  });
  Completed.associate = function (models) {
    Completed.belongsTo(models.Users, {
      as: "user",
      foreignKey: "id",
      onDelete: "CASCADE",
    });
  };
  return Completed;
};
