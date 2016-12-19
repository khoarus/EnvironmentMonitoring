var express = require("express");
var bodyparser = require("body-parser");
var session = require('express-session');
module.exports = function(app) {
    app.set("view engine", "pug");
    app.engine('pug', require('pug').renderFile);
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

    //Error handling

    /* //400
     app.use(function(req, res) {
         res.status(400);
         res.render('400');
     });

     app.use(function(req, res) {
         res.status(401);
         res.render('401');
     });
     app.use(function(req, res) {
         res.status(403);
         res.render('403');
     });
     app.use(function(req, res) {
         res.status(404);
         res.render('404');
     });
     app.use(function(req, res) {
         res.status(500);
         res.render('500');
     });

     app.use(function(req, res) {
         res.status(501);
         res.render('501');
     });

     app.use(function(req, res) {
         res.status(502);
         res.render('502');
     });

     app.use(function(req, res) {
         res.status(503);
         res.render('503');
     });

     app.use(function(req, res) {
         res.status(520);
         res.render('520');
     });

     app.use(function(req, res) {
         res.status(521);
         res.render('521');
     });*/

    var router = express.Router();
    require('./controllers/api')(app, router);
};