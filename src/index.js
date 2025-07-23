const express = require('express');
const userRouter = require('./routes/user');
const taskRouter = require('./routes/task');

const app = express();
const port = process.env.PORT;

/* app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`);
  next();
}); */

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log('Server connected at port: ', port);
});

/* try {
  throw new Error('Something went wrong');
} catch (e) {
  console.log(e.message); // Shows full Error object with message, stack, etc.
  console.log(JSON.stringify(e)); // Outputs: {} ← why? Because `message` is not enumerable
  console.log(JSON.stringify({ nom: 'moussa' }));
} */
