const express = require('express');
const app = express();

const connectExpress = function(port) {
  app.listen(port, () => {
    console.log(`Express listening on port ${port}`);
  });
}
connectExpress(3000);

app.use(express.static(`${__dirname}/src`));

app.get('/', (req, res) => {
  console.log('Connected');
  res.sendFile(`${__dirname}/src/index.html`);
});

app.get('/test', (req, res) => {
  console.log('test');
});
