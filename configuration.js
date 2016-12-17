var express = require("express");
var bodyparser = require("body-parser");
var session = require('express-session');
var path = require('path');
module.exports = function(app) {
    app.set("view engine", "html");
    app.engine('html', require('ejs').renderFile);
    app.set('views', __dirname + '/views');
    app.use('/public', express.static(__dirname + '/public'));
    app.use(bodyparser.json());
    app.use(bodyparser.urlencoded({ extended: true }));
    app.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true
    }));
    var router = express.Router();
    require('./controllers/api')(app, router);
};