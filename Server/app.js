const express = require("express");
const bodyParser = require("body-parser");
const registerRouter = require("./routes/register");
// const models = require("./models");
const Router = express.Router;
const router = new Router();
const app = express();
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());

app.use("/api/register", registerRouter);

app.listen(8080, () => {
  console.log("server is up and running");
});

module.exports = app;
