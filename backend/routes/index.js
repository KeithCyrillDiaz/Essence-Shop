const express = require('express');
const User = require('./User');
const Total = require('./Total');
const Sales = require('./Sales');
const Order = require('./Order');
const Counter = require('./Counter');
const Admin = require('./Admin');
const Product = require('./Product');

const router = express.Router();

module.exports = () => {
    User(router);
    Admin(router);
    Total(router);
    Product(router)
    Sales(router);
    Order(router);
    Counter(router);
    return router;
}