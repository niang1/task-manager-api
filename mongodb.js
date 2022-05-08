//CRUD Create Read Update Delete
/* const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectID; */
const { MongoClient, ObjectID } = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

/* const id = new ObjectID();
console.log(id.id.length);
console.log(id.toHexString().length); */
//console.log(id.getTimestamp());
const id = new ObjectID();
console.log("un ID", id.toHexString());

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log("Unable to connect to database");
    }
    return "hh";
    const db = client.db(databaseName);
    /*    db.collection("users").findOne(
      { _id: new ObjectID("626f00c5aeacbb5144646b0d") },
      (error, user) => {
        if (error) {
          return console.log("Unable to fetch ");
        }
        console.log(user);
      }
    ); */

    /*  db.collection("users")
      .find({ age: 100 })
      .toArray((error, users) => {
        console.log(users);
      });

    db.collection("users")
      .find({ age: 100 })
      .count((error, count) => {
        console.log(count);
      }); */

    /* db.collection("users").insertOne(
      {
        name: "Vikram",
        age: 26,
      },
      (error, result) => {
        if (error) {
          return console.log("Unable to insert document");
        }
        console.log(result.ops);
      }
    ); */
    /*   db.collection("tasks").insertMany(
      [
        {
          description: "Clean the house",
          completed: true,
        },
        {
          description: "Renew inspection",
          completed: false,
        },
        {
          description: "Pot plants",
          completed: false,
        },
      ],
      (error, result) => {
        if (error) return console.log("Unable to insert tasks");
        console.log(result.ops);
      }
    ); */

    /*   db.collection("tasks").findOne(
      { _id: new ObjectID("626efa0341a0072658569bcc") },
      (err, task) => {
        if (err) return console.log("Unable to fetch");
        console.log(task);
      }
    );

    db.collection("tasks")
      .find({ completed: false })
      .toArray((error, tasks) => {
        if (error) return console.log("Unable to fetch tasks");
        console.log(tasks);
      }); */

    /* const updatePromise = db.collection("users").updateOne(
      { _id: new ObjectID("6268940b5de85453e80a9c0e") },
      {
         $set: {
          name: "Mike",
        },
      }
    );
    updatePromise
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      }); */
    /* db.collection("tasks")
      .updateMany({ completed: false }, { $set: { completed: true } })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      }); */

    /*   db.collection("users")
      .deleteMany({ age: 100 })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      }); */

    db.collection("tasks")
      .deleteOne({ description: "Clean the house" })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }
);
