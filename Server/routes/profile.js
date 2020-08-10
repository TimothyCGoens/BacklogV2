const express = require("express");
const router = express.Router();
const models = require("../models");

router.get("/list/:userId", async (req, res) => {
  let userid = req.params.userId;
  const userData = await models.Users.findOne({
    where: { id: userid },
  });
  res.json(userData);
});

module.exports = router;
