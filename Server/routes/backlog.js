const express = require("express");
const router = express.Router();
const models = require("../models");

router.post("/add", async (req, res) => {
  console.log(req.body);
  let title = req.body.title;
  let coverArt = req.body.coverArt;
  let userId = req.body.userId;

  let game = {
    userId: userId,
    title: title,
    coverArt: coverArt,
  };
  await models.Games.create(game);
  res.json(game);
  console.log(game);
});

router.get("/list/:userId", async (req, res) => {
  let userId = req.params.userId;
  const gameData = await models.Games.findAll({
    where: {
      userId: userId,
    },
  });
  res.json(gameData);
});

module.exports = router;
