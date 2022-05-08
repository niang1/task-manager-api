const express = require("express");
const mongoose = require("../src/db/mongoose");
const User = require("../src/models/user");

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

app.post("/users", (req, res) => {
  user = new User(req.body);
  user
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

/* app.get("/users", (req, res) => {
  console.log(req.body);
  console.log(res.send(req.body));
}); */

app.listen(port, () => {
  console.log("Server is up and listen to port ", port);
});
