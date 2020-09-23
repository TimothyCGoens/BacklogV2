"use strict";
module.exports = (sequelize, DataTypes) => {
  const UserFeeds = sequelize.define(
    "UserFeeds",
    {
      title: DataTypes.STRING,
      action: DataTypes.STRING,
      destination: DataTypes.STRING,
      platform: DataTypes.STRING,
      platformFamily: DataTypes.STRING,
    },
    {}
  );
  UserFeeds.associate = function (models) {
    UserFeeds.belongsTo(models.Users, {
      as: "user",
      foreignKey: "id",
      onDelete: "CASCADE",
    });
  };
  return UserFeeds;
};
