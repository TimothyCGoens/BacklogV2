const express = require("express");
const router = express.Router();
const models = require("../models");

router.post("/add", async (req, res) => {
  let title = req.body.title;
  let action = req.body.action;
  let userId = req.body.userId;
  let destination = req.body.destination;
  let platform = req.body.platform;

  if (
    platform === "PlayStation 4" ||
    platform === "PlayStation 3" ||
    platform === "PlayStation 2" ||
    platform === "PlayStation" ||
    platform === "PS Vita" ||
    platform === "PSP"
  ) {
    let game = {
      userId: userId,
      title: title,
      action: action,
      destination: destination,
      platform: platform,
      platformFamily: "PlayStation",
    };
    await models.UserFeeds.create(game);
    res.json(game);
  } else if (
    platform === "Xbox Series S/X" ||
    platform === "Xbox One" ||
    platform === "Xbox 360" ||
    platform === "Xbox"
  ) {
    let game = {
      userId: userId,
      title: title,
      action: action,
      destination: destination,
      platform: platform,
      platformFamily: "Xbox",
    };
    await models.UserFeeds.create(game);
    res.json(game);
  } else if (
    platform === "Nintendo Switch" ||
    platform === "Wii U" ||
    platform === "Wii" ||
    platform === "GameCube" ||
    platform === "Nintendo 64" ||
    platform === "SNES" ||
    platform === "NES" ||
    platform === "Game Boy" ||
    platform === "Nintendo 3DS" ||
    platform === "Game Boy Color" ||
    platform === "Game Boy Advance"
  ) {
    let game = {
      userId: userId,
      title: title,
      action: action,
      destination: destination,
      platform: platform,
      platformFamily: "Nintendo",
    };
    await models.UserFeeds.create(game);
    res.json(game);
  } else if (platform === "PC") {
    let game = {
      userId: userId,
      title: title,
      action: action,
      destination: destination,
      platform: platform,
      platformFamily: "PC",
    };
    await models.UserFeeds.create(game);
    res.json(game);
  } else {
    let game = {
      userId: userId,
      title: title,
      action: action,
      destination: destination,
      platform: platform,
      platformFamily: "Other",
    };
    await models.UserFeeds.create(game);
    res.json(game);
  }
});

router.get("/list/:userId", async (req, res) => {
  let userId = req.params.userId;
  const gameData = await models.UserFeeds.findAll({
    where: {
      userId: userId,
    },
    limit: 5,
    order: [["updatedAt", "DESC"]],
  });
  res.json(gameData);
});

module.exports = router;
