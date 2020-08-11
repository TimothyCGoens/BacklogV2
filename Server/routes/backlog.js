const express = require("express");
const router = express.Router();
const models = require("../models");

router.get("/add", async (req, res) => {
  console.log(req.body);
});

module.exports = router;
