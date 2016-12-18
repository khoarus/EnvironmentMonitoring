module.exports = (app, router) => {

    var users = require("../models/users");
    var devices = require("../models/devices");
    var values = require("../models/values");
    var endpoints = require("../models/endpoints");

    router.get("/welcome", (req, res) => {
        res.json({ message: "Welcome to Environment Monitoring API", version: "1.0", StatusCode: res.statusCode });

    });
    router.get("/", (req, res) => {
        res.status(200).send({ message: "Your test is OK! The API is running!" });
    });
    //Users
    router.route('/users/login').post((req, res) => {
        var username = req.body.username,
            password = req.body.password;
        if (username === null || password === null) {

            res.status(500).send({ StatusCode: 500, message: "Required fields not null" });
            return;
        }
        users.login(username, password, (result, status) => {
            if (result !== null) {
                res.json({
                    Result: result,
                    Status: status,
                    StatusCode: 200
                });
            } else {
                res.status(400).send({ message: "Invalid Username or Password!", StatusCode: 400, Status: status });

            }
        });
    });
    router.route('/users/register').post((req, res) => {
        var username = req.body.username;
        var password = req.body.password;
        var firstname = req.body.firstname;
        var lastname = req.body.lastname;
        if (firstname === null || lastname === null || username === null || password === null) {
            res.status(400).send({ StatusCode: 400, message: "Required fields not null" });
            return;
        }
        users.register(username, password, firstname, lastname, (result) => {
            if (result === true) {
                res.json({
                    message: "Account was created successfully!",
                    StatusCode: 200
                });
            } else if (result === false) {
                res.status(409).send({
                    message: "Unable create an account. Username could be existed. Please try again with another Username!",
                    StatusCode: 409
                });
            }
            if (result === null) {
                res.status(503).send({
                    message: "Service Unavailable",
                    statusCode: 503
                });
            }
        });
    });

    router.route('/users/:id').get((req, res) => {
        var id = req.params.id;
        if (id === null) {
            res.status(400).send({
                message: "Required User ID is not null",
                StatusCode: 400
            });
            return;
        }
        users.getUserById(id, (result) => {
            if (result) {
                res.json({ Result: result, StatusCode: 200 });
            } else {
                res.status(404).send({
                    Error: "Unable to get user information! Data is null!",
                    StatusCode: 404
                });
            }
        });
    });

    router.route('/users/').get((req, res) => {
        users.getUsers((result) => {
            if (result) {
                res.json({ Result: result, StatusCode: 200 });
            } else {
                res.status(404).send({
                    message: "Unable to find any user!",
                    StatusCode: 404
                });
            }
        });
    });

    //Devices
    router.route('/devices/:id/').get((req, res) => {
        var id = req.params.id;
        if (id === null) {
            res.status(400).send({
                message: "Required Device ID is not null",
                StatusCode: 400
            });
            return;
        }
        devices.getDevice(id, (result) => {
            if (result !== null) {
                res.json({
                    Result: result,
                    StatusCode: 200
                });
            } else {
                res.status(404).send({ message: "Error! Not Found Device with ID: " + id, StatusCode: 404 });
            }
        });
    });

    router.route('/devices').get((req, res) => {
        devices.getAllDevice((result) => {
            if (result !== null) {
                res.json({
                    Result: result,
                    statusCode: 200
                });
            } else {
                res.status(404).send({
                    message: "Not Found Any Devices",
                    StatusCode: 404
                });
            }
        });
    });

    router.route('/devices/').post((req, res) => {
        var idEndPoint = req.body.endpoint,
            name = req.body.name,
            description = req.body.description,
            unit = req.body.unit,
            max = req.body.maxthreshold,
            min = req.body.minthreshold;
        if ((idEndPoint === null || idEndPoint === "") && (name === null && name === "") && (description === null || description === "") && (unit === null || unit === "") && (max === null || max === "") && (min === null || min === "")) {
            res.status(400).send({
                message: "Bad Request",
                StatusCode: 400
            });
            return;
        }
        devices.addDevice(idEndPoint, name, description, unit, max, min, (result) => {
            if (result) {
                res.json({
                    Result: result,
                    StatusCode: 200
                });
            } else {
                res.status(406).send({
                    message: "Unable to create device",
                    StatusCode: 406
                });
            }
        });
    });

    router.route('/devices/').put((req, res) => {
        var id = req.body.id;
        var device_name = req.body.name;
        var description = req.body.description;
        var unit = req.body.unit;
        var min = req.body.min;
        var max = req.body.max;

        if (!id || device_name === null || device_name === "" || description === "" || description === null || unit === null || unit === "" || min === null || max === null || max < min) {
            res.status(400).send({
                message: "Required fields is not null/empty or value invalid",
                StatusCode: 400
            });
            return;
        }
        devices.updateDeviceInfo(id, device_name, description, unit, min, max, (result) => {
            if (result == true) {
                res.json({
                    Result: "SUCCESS",
                    StatusCode: 200
                });
            } else {
                res.status(403).send({
                    message: "Can't not update information for device: " + id,
                    StatusCode: 403
                });
            }
        })
    });

    router.route('/devices/:id').delete((req, res) => {
        var id = req.params.id;
        if (!id) {
            res.status(400).send({
                message: "Required fields is not null or empty",
                StatusCode: 400
            });
            return;
        }
        devices.deleteDevice(id, (result) => {
            if (result === true) {
                res.json({
                    Result: "OK",
                    StatusCode: 200,
                    message: "The device has been delete successfully!"
                });
            } else {
                res.status(404).send({
                    Result: "FAILED",
                    StatusCode: 404,
                    message: "Unable to delete device!"
                });
            }
        });
    });

    //Values
    router.route('/values/').get((req, res) => {
        var idDevice = req.body.id;
        if (idDevice === null) {
            res.status(400).send({
                message: "Required Device ID is not null!",
                StatusCode: 400
            });
            return;
        }
        values.getValue(idDevice, (result) => {
            if (result) {
                res.json({
                    Result: result,
                    StatusCode: 200
                });
            } else {
                res.status(404).send({
                    message: "This device don't have any values",
                    StatusCode: 404
                });
            }
        });
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
        var id = req.params.id;
        if (!id) {
            res.status(400).send({
                message: "Required field is needed to delete endpoint",
                StatusCode: 400
            });
            return;
        }
        endpoints.getEndPointById(id, (result) => {
            if (result) {
                res.json({
                    Result: result,
                    StatusCode: 200
                });
            } else {
                res.status(404).send({
                    message: "Can't find any devices",
                    StatusCode: 404
                });
            }
        });
    });

    router.route('/endpoints/').get((req, res) => {
        endpoints.getEndPoints((result) => {
            if (result !== null) {
                res.json({
                    Result: result,
                    StatusCode: 200
                });
            } else {
                res.status(404).send({
                    message: "Didn't find any device",
                    StatusCode: 404
                })
            }
        })
    });

    router.route('/endpoints/delete/:id').delete((req, res) => {
        var id = req.params.id;
        if (!id) {
            res.status(400).send({
                message: "Required field is needed to delete endpoint",
                StatusCode: 400
            });
            return;
        }
        endpoints.deleteEndPoint(id, (result) => {
            if (result === true) {
                res.json({
                    Result: "Device has been deleted successfully!",
                    StatusCode: 200
                });
            } else {
                res.status(404).send({
                    message: "Unable to find endpoint",
                    StatusCode: 404
                });
            }
        });
    });

    router.use((req, res, next) => {
        next(new Error("Not implemented"));
    });
    app.use("/api/v1/", router);

};