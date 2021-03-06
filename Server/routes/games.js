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

router.get("/genres/:userId", async (req, res) => {
  let userId = req.params.userId;

  const { count, rows } = await models.Games.findAndCountAll({
    where: {
      userId: userId,
      wishlist: false,
    },
    attributes: ["genre"],
    group: "genre",
  });
  res.json(
    (genres = {
      genre: rows,
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

router.get("/sonycounts/:userId", async (req, res) => {
  let userId = req.params.userId;
  const gameData = await models.Games.findAll({
    where: {
      userId: userId,
      wishlist: false,
      platformFamily: ["PlayStation"],
    },
    attributes: ["backlogDate", "genre", "platform", "title"],
  });
  res.json(gameData);
});

router.get("/xboxcounts/:userId", async (req, res) => {
  let userId = req.params.userId;
  const gameData = await models.Games.findAll({
    where: {
      userId: userId,
      wishlist: false,
      platformFamily: ["Xbox"],
    },
    attributes: ["backlogDate", "genre", "platform", "title"],
  });
  res.json(gameData);
});

router.get("/nescounts/:userId", async (req, res) => {
  let userId = req.params.userId;
  const gameData = await models.Games.findAll({
    where: {
      userId: userId,
      wishlist: false,
      platformFamily: ["Nintendo"],
    },
    attributes: ["backlogDate", "genre", "platform", "title"],
  });
  res.json(gameData);
});

router.get("/pccounts/:userId", async (req, res) => {
  let userId = req.params.userId;
  const gameData = await models.Games.findAll({
    where: {
      userId: userId,
      wishlist: false,
      platformFamily: ["PC"],
    },
    attributes: ["backlogDate", "genre", "platform", "title"],
  });
  res.json(gameData);
});

router.get("/othercounts/:userId", async (req, res) => {
  let userId = req.params.userId;
  const gameData = await models.Games.findAll({
    where: {
      userId: userId,
      wishlist: false,
      platformFamily: ["Other"],
    },
    attributes: ["backlogDate", "genre", "platform", "title"],
  });
  res.json(gameData);
});

// router.get("/platformbydate/:userId", async (req, res) => {
//   let userId = req.params.userId;
//   const { count, rows } = await models.Games.findAndCountAll({
//     where: {
//       userId: userId,
//       wishlist: false,
//     },
//     attributes: ["platformFamily"],
//     group: "backlogDate",
//   });
//   res.json(
//     (dates = {
//       platformFamily: rows,
//       count: count,
//     })
//   );
// });

module.exports = router;
