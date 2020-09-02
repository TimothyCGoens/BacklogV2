const express = require("express");
const router = express.Router();
const models = require("../models");

router.get("/all/:userId", async (req, res) => {
  let userId = req.params.userId;

  const { count, rows } = await models.Games.findAndCountAll({
    where: {
      userId: userId,
    },
    attributes: ["platform"],
    group: "platform",
  });
  console.log(res);
  res.json(
    (platforms = {
      platform: rows,
      games: count,
    })
  );
});

module.exports = router;
