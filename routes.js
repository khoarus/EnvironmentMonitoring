var session = require('express-session');
var users = require("./models/users");
module.exports = function(app) {
    app.get('/', (req, res) => {
        res.render("index");
    });
    app.get('/login', (req, res) => {
        res.render("login");
    });

    app.get('/register', (req, res) => {
        res.render("register");
    });

    app.get('/forgot', (req, res) => {
        res.render('forgot');
    });
    app.get('/account', (req, res) => {
        res.render('account');
    });
    app.get('/logout', (req, res) => {
        req.session.destroy();
    });
    app.get('/create', (req, res) => {
        req.render("create");
    });
};