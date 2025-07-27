const app = require('./app');
const port = process.env.PORT;
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
