const express = require("express");
const router = express.Router();
const models = require("../models");

router.get("/all/:userId", async (req, res) => {
  let userId = req.params.userId;

  const { count, rows } = await models.Games.findAndCountAll({
    where: {
      userId: userId,
      wishlist: false,
    },
    attributes: ["platform"],
    group: "platform",
  });
  res.json(
    (platforms = {
      platform: rows,
      games: count,
    })
  );
});

router.get("/playing/:userId", async (req, res) => {
  let userId = req.params.userId;
  const gameData = await models.Games.findAll({
    where: {
      userId: userId,
      playing: true,
    },
  });
  res.json(gameData);
});

module.exports = router;
