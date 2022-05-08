require("../src/db/mongoose");
const Task = require("../src/models/task");

//
/* Task.findByIdAndDelete("626fce148f149a1b0034f49d")
  .then((task) => {
    console.log(task);
    return Task.countDocuments({ completed: false });
  })
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  }); */

const deleteTaskAndCount = async (id) => {
  const task = await Task.findByIdAndDelete(id);
  const count = await Task.countDocuments({ completed: false });
  return count;
};

deleteTaskAndCount("626fcc7d8f149a1b0034f49a")
  .then((count) => {
    console.log(count);
  })
  .catch((err) => {
    console.log(err);
  });

Task.findByIdAndDelete("bbbbbbb")
  .then(() => {
    return Task.countDocuments({ completed: false });
  })
  .then((count) => {
    console.log(count);
  })
  .catch((err) => {
    console.log(err);
  });

const deleteTaskAndCount1 = async (id) => {
  const task = Task.findByIdAndDelete(id);
  const count = Task.countDocuments({ completed: false });
  return count;
};
deleteTaskAndCount1("kkk")
  .then((count) => {
    console.log(count);
  })
  .catch((err) => {
    console.log(err);
  });
