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
  let genre = req.body.genre;

  if (
    platform === "PlayStation 4" ||
    platform === "PlayStation 3" ||
    platform === "PlayStation 2" ||
    platform === "PlayStation" ||
    platform === "PS Vita" ||
    platform === "PSP"
  ) {
    let game = {
      userId: userId,
      title: title,
      image: image,
      gameId: gameId,
      platform: platform,
      releaseDate: releaseDate,
      genre: genre,
      wishlist: true,
      backlog: false,
      playing: false,
      completed: false,
      platformFamily: "PlayStation",
    };
    await models.Games.create(game);
    res.json(game);
  } else if (
    platform === "Xbox Series S/X" ||
    platform === "Xbox One" ||
    platform === "Xbox 360" ||
    platform === "Xbox"
  ) {
    let game = {
      userId: userId,
      title: title,
      image: image,
      gameId: gameId,
      platform: platform,
      releaseDate: releaseDate,
      genre: genre,
      wishlist: true,
      backlog: false,
      playing: false,
      completed: false,
      platformFamily: "Xbox",
    };
    await models.Games.create(game);
    res.json(game);
  } else if (
    platform === "Nintendo Switch" ||
    platform === "Wii U" ||
    platform === "Wii" ||
    platform === "GameCube" ||
    platform === "Nintendo 64" ||
    platform === "SNES" ||
    platform === "NES" ||
    platform === "Game Boy" ||
    platform === "Nintendo 3DS" ||
    platform === "Game Boy Color" ||
    platform === "Game Boy Advance"
  ) {
    let game = {
      userId: userId,
      title: title,
      image: image,
      gameId: gameId,
      platform: platform,
      releaseDate: releaseDate,
      genre: genre,
      wishlist: true,
      backlog: false,
      playing: false,
      completed: false,
      platformFamily: "Nintendo",
    };
    await models.Games.create(game);
    res.json(game);
  } else if (platform === "PC") {
    let game = {
      userId: userId,
      title: title,
      image: image,
      gameId: gameId,
      platform: platform,
      releaseDate: releaseDate,
      genre: genre,
      wishlist: true,
      backlog: false,
      playing: false,
      completed: false,
      platformFamily: "PC",
    };
    await models.Games.create(game);
    res.json(game);
  } else {
    let game = {
      userId: userId,
      title: title,
      image: image,
      gameId: gameId,
      platform: platform,
      releaseDate: releaseDate,
      genre: genre,
      wishlist: true,
      backlog: false,
      playing: false,
      completed: false,
      platformFamily: "Other",
    };
    await models.Games.create(game);
    res.json(game);
  }
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
