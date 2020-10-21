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
  // console.log(res.data.data);
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
      // console.log(createArray[0].name.toLowerCase());
      // console.log(req.query.query.toLowerCase());

      // console.log(Object.keys(coasters.data["hydra:member"][1]));
      // console.log(typeof coasters.data["hydra:member"][0]);

      const findCoaster = createArray.find(
        (coasterObject) => coasterObject.name === req.query.query
      );
      /*.query.query.toLowerCase();*/

      res.send({
        name: findCoaster.name,
        park: findCoaster.park.name,
        height: findCoaster.height,
        speed: findCoaster.speed,
        // image: findCoaster[0].mainImage,
      });
      // console.log(image);
      // console.log(findCoaster);
    })
    .catch((err) => console.log(err));
});

// app.get("/api/parks", function (req, res) {
//   res.send();
// });

// app.get("/api/coasters", function (req, res) {
//   res.send();
// });

app.listen(port, () => console.log(`Listening on port ${port}`));

// Small collection (less than 100 documents)
// Use with care - Frontend user experience may take a hit

// Handling this on the front end should be fine as long as you are not doing too much logic with this returned array.

// db.collection('...').get().then(snap => {
//    size = snap.size // will return the collection size
// });
