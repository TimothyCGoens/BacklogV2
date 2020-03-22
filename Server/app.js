const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser);

app.get("/", (req, res) => {
  res.send("hola");
});

app.listen(8080, () => {
  console.log("server is up and running");
});
