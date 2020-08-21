const express = require("express");
const router = express.Router();
const models = require("../models");

router.post("/add", async (req, res) => {
  let title = req.body.title;
  let startDate = req.body.createdAt;
  let userId = req.body.userId;

  let game = {
    userId: userId,
    title: title,
    startDate: startDate,
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
