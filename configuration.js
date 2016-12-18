var express = require("express");
var bodyparser = require("body-parser");
var session = require('express-session');
module.exports = function(app) {
    app.set("view engine", "html");
    app.engine('html', require('ejs').renderFile);
    app.set('views', __dirname + '/views');
    app.use('/public', express.static(__dirname + '/public'));
    app.use(bodyparser.json());
    app.use(bodyparser.urlencoded({ extended: true }));
    app.use(session({
        cookie: 'session',
        secret: 'userlogin',
        resave: false,
        saveUninitialized: true
    }));
    var router = express.Router();
    require('./controllers/api')(app, router);
};