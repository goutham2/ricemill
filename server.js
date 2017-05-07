'use strict';

const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const authController = require('./controllers/auth-controller');
const StockController = require('./controllers/stock-controller');
const CreditController = require('./controllers/credit-controller');
const configurePassport = require('./config/passport-jwt-config');
const app = express();
app.use(passport.initialize());
configurePassport();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/auth', authController);
app.use('/stock',StockController);
app.use('/credit',CreditController);
app.listen(3000);