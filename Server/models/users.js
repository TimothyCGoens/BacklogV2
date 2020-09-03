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
      platforms: DataTypes.ARRAY(DataTypes.STRING),
    },
    {}
  );
  Users.associate = function (models) {
    Users.hasMany(models.Games, {
      as: "games",
      foreignKey: "userId",
    });
  };
  return Users;
};
