const express = require("express");
const router = express.Router();
const models = require("../models");

router.post("/finish", async (req, res) => {
  let title = req.body.title;
  let startDate = req.body.createdAt;
  let userId = req.body.userId;
  let image = req.body.image;
  let gameId = req.body.gameId;
  let platform = req.body.platform;
  let releaseDate = req.body.releaseDate;
  let rating = req.body.rating;
  let id = req.body.id;
  let completedDate = req.body.completedDate;

  let game = {
    userId: userId,
    title: title,
    image: image,
    startDate: startDate,
    gameId: gameId,
    platform: platform,
    releaseDate: releaseDate,
    playing: false,
    wishlist: false,
    backlog: false,
    completed: true,
    rating: rating,
    completedDate: completedDate,
  };

  await models.Games.update(game, { where: { id: id } });
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
