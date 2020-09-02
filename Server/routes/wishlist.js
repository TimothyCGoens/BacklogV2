const express = require("express");
const router = express.Router();
const models = require("../models");

router.post("/add", async (req, res) => {
  let title = req.body.title;
  let image = req.body.image;
  let userId = req.body.userId;
  let gameId = req.body.gameId;
  let platform = req.body.platform;
  let releaseDate = req.body.releaseDate;

  let game = {
    userId: userId,
    title: title,
    image: image,
    gameId: gameId,
    platform: platform,
    releaseDate: releaseDate,
    wishlist: true,
  };
  await models.Games.create(game);
  res.json(game);
});

router.post("/delete/:id", async (req, res) => {
  let id = req.params.id;
  models.Games.destroy({
    where: {
      id: id,
    },
  });
});

router.get("/list/:userId", async (req, res) => {
  let userId = req.params.userId;
  const gameData = await models.Games.findAll({
    where: {
      userId: userId,
      wishlist: true,
    },
  });
  res.json(gameData);
});

module.exports = router;
