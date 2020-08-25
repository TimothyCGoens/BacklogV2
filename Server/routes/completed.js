const express = require("express");
const router = express.Router();
const models = require("../models");

router.post("/add", async (req, res) => {
  console.log("*************");
  console.log(req.body);
  let title = req.body.title;
  let startDate = req.body.createdAt;
  let userId = req.body.userId;
  let image = req.body.image;
  let gameId = req.body.gameId;

  let game = {
    userId: userId,
    title: title,
    image: image,
    startDate: startDate,
    gameId: gameId,
  };

  await models.Completeds.create(game);
  res.json(game);
});

router.get("/list/:userId", async (req, res) => {
  let userId = req.params.userId;
  const gameData = await models.Completeds.findAll({
    where: {
      userId: userId,
    },
  });
  res.json(gameData);
});

module.exports = router;
