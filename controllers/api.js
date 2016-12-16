module.exports = (app, router) => {

    var users = require("../models/users");

    router.get("/", (req, res) => {
        res.json({ message: "Welcome to Environment Monitoring API", version: "1.0", statusCode: res.statusCode });
    });

    //Users
    router.route('/users/login').post((req, res) => {
        var username = req.body.username,
            password = req.body.password;
        if (username == null || password == null) {
            res.json({ statusCode: 500, message: "Required fields not null" });
        }
        users.login(username, password, (result) => {
            if (result != null) {
                res.json(result);
            } else {
                res.json({ message: "Invalid Username or Password!", ErrorCode: 400 });
            }
        });
    });
    router.route('/users/register').post((req, res) => {
        var username = req.body.username;
        var password = req.body.password;
        var firstname = req.body.firstname;
        var lastname = req.body.lastname;
        if (firstname == null || lastname == null || username == null || password == null) {
            res.json({ statusCode: 400, message: "Required fields not null" });
        }
        users.register(username, password, firstname, lastname, (result) => {
            if (result === true) {
                res.json({
                    message: "Account was created successfully!",
                    ErrorCode: 200
                });
            } else {
                res.json({
                    message: "Unable create an account. Please try again later!",
                    ErrorCode: 404
                });
            };
        });
    });

    router.route('/users/:id').get((req, res) => {
        var id = req.params.id;
        users.getUserById(id, (result) => {
            if (result) {
                res.json(result);
            } else {
                res.json({
                    Error: "Unable to get user information! Data is null!",
                    ErrorCode: 404
                });
            }
        });
    });

    //Devices
    router.route('/devices/:id/').get((req, res) => {
        var id = req.params.id;

    });

    router.route('/devices').get((req, res) => {

    });

    router.route('/devices/search').get((req, res) => {

    });

    router.route('/devices/create').get((req, res) => {

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

    router.route('/endpoints/').get((req, res) => {

    });

    router.use((req, res, next) => {
        next(new Error("Not implemented"));
    });
    app.use("/api/v1/", router);

}