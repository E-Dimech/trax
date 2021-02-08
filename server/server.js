const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const axios = require("axios");
const port = process.env.PORT || 8080;
const path = require("path");

app.use(bodyParser());

app.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("../client/build"));
}

app.get("*", (request, response) => {
  response.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

app.get("/search", function (req, res) {
  console.log(req, "this is req");
  axios
    .get(`https://captaincoaster.com/api/coasters?name=${req.query.query}`, {
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": "406e0870-3010-449c-bfd1-5e46460f0d4c",
      },
    })
    .then((coasters) => {
      const createArray = Object.values(coasters.data["hydra:member"]);
      // console.log(req.query.query);
      const findCoaster = createArray.find(
        (coasterObject) =>
          coasterObject.name.toLowerCase() === req.query.query.toLowerCase()
      );

      res.send({
        // id: findCoaster.id,
        name: findCoaster.name,
        park: findCoaster.park.name,
        height: findCoaster.height,
        speed: findCoaster.speed,
        image:
          "https://captaincoaster.com/images/coasters/" +
          findCoaster.mainImage.path,
      });
      // console.log(findCoaster.mainImage.path);
    })
    .catch((err) => console.log(err));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
