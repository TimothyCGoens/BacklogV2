"use strict";
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "Users",
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      location: DataTypes.STRING,
    },
    {}
  );
  Users.associate = function (models) {
    Users.hasMany(models.Backlogs, {
      as: "backlogs",
      foreignKey: "userId",
    });
    Users.hasMany(models.Wishlists, {
      as: "wishlists",
      foreignKey: "userId",
    });
  };
  return Users;
};
