const express = require("express");
const router = express.Router();
const models = require("../models");

router.post("/add", async (req, res) => {
  let title = req.body.title;
  let startDate = req.body.createdAt;
  let userId = req.body.userId;
  let image = req.body.image;
  let gameId = req.body.gameId;
  let platform = req.body.platform;
  let releaseDate = req.body.releaseDate;

  let game = {
    userId: userId,
    title: title,
    image: image,
    startDate: startDate,
    gameId: gameId,
    platform: platform,
    releaseDate: releaseDate,
    wishlist: false,
    backlog: false,
    completed: true,
  };

  await models.Games.create(game);
  res.json(game);
});

router.get("/list/:userId", async (req, res) => {
  let userId = req.params.userId;
  const gameData = await models.Games.findAll({
    where: {
      userId: userId,
      completed: true,
    },
  });
  res.json(gameData);
});

module.exports = router;
