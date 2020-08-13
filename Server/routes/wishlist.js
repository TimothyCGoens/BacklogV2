const express = require("express");
const router = express.Router();
const models = require("../models");

router.post("/add", async (req, res) => {
  console.log(req.body);
  let title = req.body.title;
  let image = req.body.image;
  let userId = req.body.userId;

  let game = {
    userId: userId,
    title: title,
    image: image,
  };
  await models.Wishlists.create(game);
  res.json(game);
  console.log(game);
});

router.post("/delete", async (req, res) => {
  let id = req.body.id;
  models.Wishlists.destroy({
    where: {
      id: id,
    },
  });
});

router.get("/list/:userId", async (req, res) => {
  let userId = req.params.userId;
  const gameData = await models.Wishlists.findAll({
    where: {
      userId: userId,
    },
  });
  res.json(gameData);
});

module.exports = router;
