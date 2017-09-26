const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express(); // Creates an express app
app.use(bodyParser.json()); // Middleware that uses the body-parser
app.use(session({
  secret: 'tH3 $3Kr3T 1$ Th@ t3h mEs$@Ge 1s $tIlL r3@dA8L3', // key used for incryption
  resave: false, // 
  saveUninitialized: false //
}));
