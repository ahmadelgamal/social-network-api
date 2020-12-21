const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const db = mongoose.connection;

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

mongoose.set('debug', true);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network-api', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

app.listen(PORT, () => console.log(`Connected on localhost:${PORT}`));

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connection to db has been made.');
});
