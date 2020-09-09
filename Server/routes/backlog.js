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
    backlog: true,
    wishlist: false,
    completed: false,
    playing: false,
    backlogDate: Date(),
  };
  await models.Games.create(game);
  res.json(game);
});

router.post("/start-playing", async (req, res) => {
  let title = req.body.title;
  let image = req.body.image;
  let userId = req.body.userId;
  let gameId = req.body.gameId;
  let platform = req.body.platform;
  let releaseDate = req.body.releaseDate;
  let id = req.body.id;
  let playing = req.body.playing;

  let game = {
    userId: userId,
    title: title,
    image: image,
    gameId: gameId,
    platform: platform,
    releaseDate: releaseDate,
    backlog: true,
    playing: playing,
    wishlist: false,
    completed: false,
    startPlayingDate: Date(),
  };

  await models.Games.update(game, {
    where: { id: id },
  });
  res.json(game);
});

router.post("/stop-playing", async (req, res) => {
  let title = req.body.title;
  let image = req.body.image;
  let userId = req.body.userId;
  let gameId = req.body.gameId;
  let platform = req.body.platform;
  let releaseDate = req.body.releaseDate;
  let playing = req.body.playing;
  let id = req.body.id;

  let game = {
    userId: userId,
    title: title,
    image: image,
    gameId: gameId,
    platform: platform,
    releaseDate: releaseDate,
    backlog: true,
    playing: playing,
    wishlist: false,
    completed: false,
    stopPlayingDate: Date(),
  };

  await models.Games.update(game, {
    where: { id: id },
  });
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
      backlog: true,
    },
  });
  res.json(gameData);
});

// router.get("/platforms/:userId", async (req, res) => {
//   let userId = req.params.userId;

//   const { count, rows } = await models.Backlogs.findAndCountAll({
//     where: {
//       userId: userId,
//     },
//     attributes: ["platform"],
//     group: "platform",
//   });
//   res.json(
//     (platforms = {
//       platform: rows,
//       games: count,
//     })
//   );
// });

module.exports = router;
