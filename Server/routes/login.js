const express = require("express");
const router = express.Router();
const models = require("../models");
const jwt = require("jsonwebtoken");

function authenticate(req, res, next) {
  let headers = req.headers["authorization"];
  let token = headers.split(" ")[1];

  jwt.verify(token, "secret", (err, decoded) => {
    if (decoded) {
      if (decoded.username) {
        next();
      } else {
        res.status(401).json({ message: "Token invalid" });
      }
    } else {
      res.status(401).json({ message: "Token invalid" });
    }
  });
}

router.post("/user", (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  models.Users.findOne({
    where: {
      username: username,
      password: password,
    },
  }).then((user) => {
    if (user) {
      jwt
        .sign({ username: username }, "secret", function (err, token) {
          if (token) {
            res.json({ token: token, id: user.dataValues.id });
            console.log(token);
          } else {
            res.status(500).json({ message: "unable to generate token" });
          }
        })
        .catch((err) => {
          res.statusCode = 500;
          res.json(err);
          console.log(err);
        });
    }
  });
});

module.exports = router;
