
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();
app.use(cors())
app.use(bodyParser.json({ type: 'application/json' }));

var router = express.Router();



var auth = require('./middleware/auth.js');

var users = require('./controller/users.js');

var products = require('./controller/products.js');

var categories = require('./controller/categories.js');

var orders = require('./controller/orders.js');


app.post('/login', users.login);

app.post('/signup', users.signup);

// app.get('/login',auth.isAuthenticated,users.getUserData);

app.get('/products',auth.isAuthenticated,products.soldProduct);

app.get('/categories',auth.isAuthenticated,categories.soldCategories);

app.get('/orders',auth.isAuthenticated,orders.sellerRevenue);

app.get('/order_product',auth.isAuthenticated,orders.getOrderProduct);






app.listen(8080);
console.log('http://localhost:8080/address');
