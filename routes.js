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
    app.post('/login', (req, res) => {

    });
    app.post('/register', (req, res) => {
        var username = req.body.username;
        var password = req.body.password;
        var firstname = req.body.firstname;
        var lastname = req.body.lastname;
        var result = users.register(username, password, firstname, lastname);
        if (result) {
            res.send("OK");
        } else {
            res.send("ERROR");
        }
    });
};