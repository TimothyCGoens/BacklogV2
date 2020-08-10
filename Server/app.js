const express = require("express");
const bodyParser = require("body-parser");
const registerRouter = require("./routes/register");
const usersRouter = require("./routes/users");
const loginRouter = require("./routes/login");
const profileRouter = require("./routes/profile");
// const models = require("./models");
const Router = express.Router;
const router = new Router();
const app = express();
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());

app.use("/api/register", registerRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use("/api/profile", profileRouter);

app.listen(8080, () => {
  console.log("server is up and running");
});

module.exports = app;
