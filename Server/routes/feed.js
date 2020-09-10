const express = require("express");
const router = express.Router();
const models = require("../models");

router.post("/add", async (req, res) => {
  let title = req.body.title;
  let action = req.body.action;
  let userId = req.body.userId;
  let destination = req.body.destination;

  let game = {
    userId: userId,
    title: title,
    action: action,
    destination: destination,
  };
  console.log(game);
  await models.UserFeeds.create(game);
  res.json(game);
});

router.get("/list/:userId", async (req, res) => {
  let userId = req.params.userId;
  const gameData = await models.UserFeeds.findAll({
    where: {
      userId: userId,
    },
    limit: 5,
  });
  res.json(gameData);
});

module.exports = router;
