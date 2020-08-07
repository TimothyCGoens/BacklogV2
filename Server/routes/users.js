const express = require("express");
const router = express.Router();
const models = require("../models");

router.get("/list", async (req, res) => {
  const users = await models.Users.findAll();
  res.json(users);
});

module.exports = router;
