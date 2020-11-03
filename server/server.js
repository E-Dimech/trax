const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const axios = require("axios");
const port = process.env.PORT || 8080;

app.use(bodyParser());

app.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/search", function (req, res) {
  axios
    .get("https://captaincoaster.com/api/coasters", {
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": "406e0870-3010-449c-bfd1-5e46460f0d4c",
      },
    })
    .then((coasters) => {
      const createArray = Object.values(coasters.data["hydra:member"]);
      console.log(req.query.query);
      const findCoaster = createArray.find(
        (coasterObject) =>
          coasterObject.name.toLowerCase() /*||
          coasterObject.name.toUpperCase()*/ ===
          req.query.query
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
      console.log(findCoaster.mainImage.path);
    })
    .catch((err) => console.log(err));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
