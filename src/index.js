const express = require("express");
require("./db/mongoose");

const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();
const port = process.env.PORT;

/* app.use((req, res, next) => {
  res.status("503").send("The website is unavailable, please try again later");
}); */

/* app.post("/upload", upload.single("upload"), (req, res) => {
  res.send();
}); */

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log("Server is up on port", port);
});

//const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const myFunction = async () => {
  const token = jwt.sign({ _id: "abc" }, "thisismynewcours");
  console.log(token);

  const data = jwt.verify(token, "thisismynewcours");
  console.log(data);
  /*  const password = "Red12345!";
  const hashedPassword = await bcrypt.hash(password, 8);
  console.log(password);
  console.log(hashedPassword);

  const isMatch = await bcrypt.compare("Red12345!", hashedPassword);
  console.log(isMatch); */
};

//myFunction();

const Task = require("./models/task");
const User = require("./models/user");
const main = async () => {
  /* const task = await Task.findById("62768d79470c6062e0d397dc");
  await task.populate("owner").execPopulate("user");
  console.log("tttt", task.owner); */
  /* const user = await User.findById("6276835d0072904478e48cd0");
  await user.populate("tasks").execPopulate(); */
  //console.log(user.tasks);
  //6276835d0072904478e48cd0
};
//main();
