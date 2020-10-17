const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/api/parks", function (req, res) {
  res.send();
});

app.get("/api/coasters", function (req, res) {
  res.send();
});

app.listen(port, () => console.log(`Listening on port ${port}`));
