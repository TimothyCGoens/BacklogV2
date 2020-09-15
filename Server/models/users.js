"use strict";
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "Users",
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
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
    Users.hasMany(models.UserFeeds, {
      as: "userFeeds",
      foreignKey: "userId",
    });
  };
  return Users;
};
