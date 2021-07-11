const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const router = require('./routes');
require('dotenv').config();

const uri = process.env.uri;

const app = express();

app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/contacts', router);

app.get('/', (req, res) => {});

const port = process.env.PORT || 8080;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Running on http://localhost:${port}`);
    });
  })
  .catch((e) => {
    console.log(e);
  });
