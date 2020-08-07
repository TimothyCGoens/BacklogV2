const express = require("express");
const router = express.Router();
const models = require("../models");

router.post("/new", async (req, res) => {
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let email = req.body.email;
  let username = req.body.username;
  let password = req.body.password;
  let location = req.body.location;

  let user = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    username: username,
    password: password,
    location: location,
  };

  await models.Users.create(user);
  res.json(user);
  console.log(user);
});

module.exports = router;
