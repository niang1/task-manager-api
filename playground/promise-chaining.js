require("../src/db/mongoose");
const User = require("../src/models/user");

/* User.findByIdAndUpdate("626f46efc1286a155c5379d9", { age: 27 })
  .then((user) => {
    console.log(user);
    return User.countDocuments({ age: 27 });
  })
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  }); */

const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age });
  const count = await User.countDocuments({ age });
  return { user, count };
};

updateAgeAndCount("626f46efc1286a155c5379d9", 35)
  .then((count) => {
    console.log(count);
  })
  .catch((err) => {
    console.log(err);
  });

const age = 35;
User.findByIdAndUpdate({ _id: new ObjectID("hhdhdhdhdh") }, { age })
  .then((user) => {
    return User.countDocuments({ age });
  })
  .then((count) => {
    console.log(count);
  })
  .catch((err) => {
    console.log(err);
  });
