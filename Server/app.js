const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const models = require("./models");

// const Router = express.Router();
// const registrationRouter = require("./routes/registration");

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("hola");
});

app.get("/registration", (req, res) => {
  res.send("here we are");
});

app.post("/register", async (req, res) => {
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

// app.use("/api/registration", registrationRouter);

app.listen(8080, () => {
  console.log("server is up and running");
});

// module.exports = app;
