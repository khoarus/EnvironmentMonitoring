var express = require("express");
var bodyparser = require("body-parser");
var cookieParser = require('cookie-parser')
var session = require('express-session');
var fs = require('fs');
var pug = require('pug');
module.exports = function(app) {
    app.set("view engine", "pug");
    app.engine('pug', pug.renderFile, (filepath, options, callback) => {
        fs.readFile(filepath, (err, content) => {
            if (err) return callback(err);
            var name = content.toString().replace("#{title}", options.message).replace("#{username}", options.message);

            return callback(null, name);
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