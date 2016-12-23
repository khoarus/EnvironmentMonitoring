var express = require("express");
var bodyparser = require("body-parser");
var cookieParser = require('cookie-parser')
var session = require('express-session');
var fs = require('fs');
module.exports = function(app) {
    app.set("view engine", "pug");
    app.engine('pug', (filepath, options, callback) => {
        fs.readFile(filepath, (err, content) => {
            if (err) return callback(err);
            var rendered = content.toString().replace("#{title}", options.message).replace("#{error}", options.message);
            return callback(null, rendered);
        });
    });
    app.set('views', __dirname + '/views');
    app.use('/public', express.static(__dirname + '/public'));
    app.use(bodyparser.json());
    app.use(bodyparser.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(session({
        cookie: 'session',
        secret: 'userlogin',
        resave: false,
        saveUninitialized: true,
        duration: 30 * 60 * 1000,
        activeDuration: 5 * 60 * 1000
    }));

    var router = express.Router();
    require('./controllers/api')(app, router);
};