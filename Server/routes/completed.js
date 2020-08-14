const express = require("express");
const router = express.Router();
const models = require("../models");

router.post("/add", async (req, res) => {
  let title = req.body.title;
  let startDate = req.body.startDate;

  let game = {
    userId: userId,
    title: title,
    startDate: startDate,
  };

  await models.Completed.create(game);
  res.json(game);
});

module.exports = router;
