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
  // console.log(req);
  axios
    .get("https://captaincoaster.com/api/coasters", {
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": "406e0870-3010-449c-bfd1-5e46460f0d4c",
      },
    })
    // .then((search) => {
    .then((coasters) => {
      const createArray = Object.values(coasters.data["hydra:member"]);

      // console.log(createArray[0].name.toLowerCase());
      // console.log(req.query.query.toLowerCase());

      console.log(Object.keys(coasters.data["hydra:member"][0]));
      // console.log(typeof coasters.data["hydra:member"][0]);

      const findCoaster = createArray.filter((coasterObject) => {
        return (
          coasterObject.name.toLowerCase() === req.query.query.toLowerCase()
        );
      });
      //map to create individual array to pass to client
      res.send({
        name: findCoaster[0].name,
        park: findCoaster[0].park.name,
        height: findCoaster[0].height,
        speed: findCoaster[0].speed,
        image: findCoaster[0].mainImage.path,
      });
      // console.log(findCoaster);
    })
    .catch((err) => console.log(err)); /*res.send(err));*/
});
// console.log();
// app.get("/api/parks", function (req, res) {
//   res.send();
// });

// app.get("/api/coasters", function (req, res) {
//   res.send();
// });

app.listen(port, () => console.log(`Listening on port ${port}`));

// [
//   '@context',
//   '@id',
//   '@type',
//   'hydra:member',
//   'hydra:totalItems',
//   'hydra:view',
//   'hydra:search'
// ]
