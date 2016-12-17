module.exports = (app, router) => {
    var users = require("../models/users");
    var devices = require("../models/devices");
    var values = require("../models/values");
    var endpoints = require("../models/endpoints");

    router.get("/welcome", (req, res) => {
        res.json({ message: "Welcome to Environment Monitoring API", version: "1.0", StatusCode: res.statusCode });
    });

    //Users
    router.route('/users/login').post((req, res) => {
        var username = req.body.username,
            password = req.body.password;
        if (username == null || password == null) {
            res.json({ StatusCode: 500, message: "Required fields not null" });
        }
        users.login(username, password, (result, status) => {
            if (result != null) {
                res.json({
                    Result: result,
                    Status: status,
                    StatusCode: 200
                });
            } else {
                res.json({ message: "Invalid Username or Password!", StatusCode: 400, Status: status });
            }
        });
    });
    router.route('/users/register').post((req, res) => {
        var username = req.body.username;
        var password = req.body.password;
        var firstname = req.body.firstname;
        var lastname = req.body.lastname;
        if (firstname == null || lastname == null || username == null || password == null) {
            res.json({ StatusCode: 400, message: "Required fields not null" });
        }
        users.register(username, password, firstname, lastname, (result) => {
            if (result === true) {
                res.json({
                    message: "Account was created successfully!",
                    StatusCode: 200
                });
            } else {
                res.json({
                    message: "Unable create an account. Please try again later!",
                    StatusCode: 404
                });
            };
        });
    });

    router.route('/users/:id').get((req, res) => {
        var id = req.params.id;
        users.getUserById(id, (result) => {
            if (result) {
                res.json({ Result: result, StatusCode: 200 });
            } else {
                res.json({
                    Error: "Unable to get user information! Data is null!",
                    StatusCode: 404
                });
            }
        });
    });

    //Devices
    router.route('/devices/:id/').get((req, res) => {
        var id = req.params.id;
        devices.getDevice(id, (result) => {
            if (result != null) {
                res.json({ Result: result, StatusCode: 200 });
            }
        });
    });

    router.route('/devices').get((req, res) => {

    });

    router.route('/devices/search').get((req, res) => {

    });

    router.route('/devices/create').post((req, res) => {

    });

    router.route('/devices/:id').put((req, res) => {

    });

    router.route('/devices/:id').delete((req, res) => {

    });

    //Values
    router.route('/values/').get((req, res) => {

    });

    router.route('/values/:id').get((req, res) => {

    });

    router.route('/values/:id').put((req, res) => {

    });

    router.route('/values/:id').post((req, res) => {

    });

    router.route('/values/:id').delete((req, res) => {

    });

    //Endpoints
    router.route('/endpoints/:id').get((req, res) => {

    });

    router.route('/endpoints/search').get((req, res) => {

    });

    router.route('/endpoints/').get((req, res) => {

    });

    router.use((req, res, next) => {
        next(new Error("Not implemented"));
    });
    app.use("/api/v1/", router);

}