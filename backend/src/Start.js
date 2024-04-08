const app = require('./App');

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Developer Mode, Listening: http://localhost:${port}`);
});
