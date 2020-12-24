const express = require('express');
const app = express();
const routes = require('./routes');
const PORT = process.env.PORT || 3001;
const db = require('./config/connection'); // db = mogoose.connection

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

db.on('error', console.error.bind(console, 'Database connection error:'));
db.once('open', function () {
  app.listen(PORT, () => console.log(`Database connected on localhost:${PORT}`));
});
