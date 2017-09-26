const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express(); // Creates an express app

//Required Middleware
const checkForSession = require(`${__dirname}/middlewares/checkForSession`);

//Required Controllers
const sc = require(`${__dirname}/controllers/swag_controller`);
const ac = require(`${__dirname}/controllers/auth_controller`);
const cc = require(`${__dirname}/controllers/cart_controller`);
const search_controller = require(`${__dirname}/controllers/search_controller`);

//Use the Top-Level Middleware
//app.use means it is top-level
app.use(bodyParser.json()); // Middleware that uses the body-parser
app.use(session({
  secret: 'tH3 $3Kr3T 1$ Th@ t3h mEs$@Ge 1s $tIlL r3@dA8L3', // key used for incryption
  resave: false, //
  saveUninitialized: false //
}));
app.use(checkForSession);
app.use(express.static(`${__dirname}/../public/build`));

const swagUrl = '/api/swag';
app.get(swagUrl, sc.read);

app.post('/api/login', ac.login);
app.post('/api/register', ac.register);
app.post('/api/signout', ac.signout);
app.get('/api/user', ac.getUser);

const cartUrl = '/api/cart';
app.post(cartUrl, cc.add);
app.post(cartUrl+"/checkout", cc.checkout);
app.delete(cartUrl, cc.remove);

const searchUrl = '/api/search';
app.get(searchUrl, search_controller.search);

const port = 3000;
app.listen(port, () => {console.log(`Server listening ${port.toLocaleString()} leagues under the sea...`)}) // This should be normally called after the database is aquired. toLocaleString is for fun.
