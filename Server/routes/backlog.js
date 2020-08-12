const express = require("express");
const router = express.Router();
const models = require("../models");

router.get("/add", async (req, res) => {
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

module.exports = router;
