const app = require('./App');

const port = process.env.PORT || 5000;
const node = process.env.NODE_ENV || 'dev';

app.listen(port, () => {
  console.log(`[${node}] Listening: http://localhost:${port}`);
});
