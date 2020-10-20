const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const axios = require("axios");
const port = process.env.PORT || 8080;

app.use(bodyParser());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/search", function (req, res) {
  console.log(req);
  axios
    .get("https://captaincoaster.com/api/coasters", {
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": "406e0870-3010-449c-bfd1-5e46460f0d4c",
      },
    })
    .then((search) => {
      console.log(search.data);
      res.send(search.data);
    })
    .catch((err) => res.send(err));
});
// console.log();
// app.get("/api/parks", function (req, res) {
//   res.send();
// });

// app.get("/api/coasters", function (req, res) {
//   res.send();
// });

app.listen(port, () => console.log(`Listening on port ${port}`));
