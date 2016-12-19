module.exports = (app, router) => {

    var users = require("../models/users");
    var devices = require("../models/devices");
    var values = require("../models/values");
    var endpoints = require("../models/endpoints");

    //Welcom page
    router.get("/welcome", (req, res) => {
        res.json({ message: "Welcome to Environment Monitoring API", version: "1.0", StatusCode: res.statusCode });

    });

    //Test API
    router.get("/", (req, res) => {
        res.status(200).send({ message: "Your test is OK! The API is running! This is API home" });
    });
    //Users

    //Login
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

    //Register
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

    //Get user specific by ID
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

    //Get all users
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

    //Get device by ID
    router.route('/devices/fetch/:id/').get((req, res) => {
        var id = req.params.id;
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

    //Get all devices
    router.route('/devices/fetch').get((req, res) => {
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

    //Create a device
    router.route('/devices/create').post((req, res) => {
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

    //update device info
    router.route('/devices/update').put((req, res) => {
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
                    message: "FAILED",
                    StatusCode: 403
                });
            }
        })
    });

    //Delete device
    router.route('/devices/delete/:id').delete((req, res) => {
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

    //Fetch specific value
    router.route('/values/fetch/:id').get((req, res) => {
        var idDevice = req.params.id;
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

    //Fetch the latest value of device
    router.route('/values/fetch/latest/:iddevice').get((req, res) => {
        var id = req.params.iddevice;
        if (!id) {
            res.status(400).send({
                message: "Required value ID is not null!",
                StatusCode: 400
            });
            return;
        }
        values.getLatestValue(id, (result) => {
            if (result) {
                res.json({
                    Result: result,
                    StatusCode: 200
                });
            } else {
                res.status(404).send({
                    message: "This device don't have latest value",
                    StatusCode: 404
                });
            }
        });
    });

    //Update value of device
    router.route('/values/update').put((req, res) => {
        var device = req.body.idDevice,
            idValue = req.body.idValue,
            value = req.body.value;
        if (!device || !idValue || !value) {
            res.status(400).send({
                message: "Required value ID is not null!",
                StatusCode: 400
            });
            return;
        }
        values.changeValue(idValue, device, value, (result) => {
            if (result) {
                res.json({
                    Result: result,
                    StatusCode: 200
                });
            } else {
                res.status(404).send({
                    message: "Can't change this value",
                    StatusCode: 404
                });
            }
        });
    });

    //Add value
    router.route('/values/create/:endpoint/:device/:time/:value').post((req, res) => {
        var device = req.params.idDevice;
        var time = req.params.time;
        var value = req.params.value;
        var endpoint = req.params.endpoint;
        if (!device || !time || !value || !endpoint) {
            res.status(400).send({
                message: "Required fields is needed to create value",
                StatusCode: 400
            });
            return;
        }
        values.postValue(value, time, device, (result) => {
            if (result === true) {
                res.json({
                    message: "SUCCESS",
                    StatusCode: 200
                });
            } else {
                res.status(408).send({
                    message: "FAILED",
                    StatusCode: 408
                });
            }
        });
    });

    //Delete value
    router.route('/values/delete/:id').delete((req, res) => {
        var id = req.params.id;
        if (!id) {
            res.status(400).send({
                message: "Required field is needed to fetch specific value"
            });
            return;
        }
        values.deleteValue(id, (result) => {
            if (result < 0) {
                res.status(404).send({
                    message: "Value Not Found",
                    StatusCode: 404
                })
            } else if (!result) {
                res.this.status(400).send({
                    message: "Unable to delete value: " + id,
                    StatusCode: 400
                });
            } else {
                res.json({
                    message: "Value " + id + " has been deleted successfully!",
                    StatusCode: 200
                });
            }
        });
    });

    //Endpoints
    router.route('/endpoints/fetch/:id').get((req, res) => {
        var id = req.params.id;
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

    router.route('/endpoints/fetch').get((req, res) => {
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
                });
            }
        });
    });

    router.route('/endpoints/create').post((req, res) => {
        var name = req.body.name;
        var description = req.body.description;
        var address = req.body.description;
        if ((!name || name == "") || (!description || description == "") || (!address || address == "")) {
            res.status(400).send({
                message: "Required fields not null or empty",
                StatusCode: 400
            });
            return;
        }
        endpoints.addEndPoint(name, description, address, (result) => {
            if (result == true) {
                res.json({
                    message: "Endpoints has been created successfully!",
                    StatusCode: 200
                });
            } else {
                res.status(409).send({
                    message: "Endpoint name conflict",
                    StatusCode: 409
                });
            }
        });
    });

    router.route('/endpoints/update/:id').put((req, res) => {
        var id = req.params.id,
            name = req.body.name,
            description = req.body.description,
            address = req.body.address;
        if (!id || (!name || name == "") || (!description || description == "") || (!address || address == "")) {
            res.status(400).send({
                message: "Required fields is not null",
                StatusCode: 400
            });
            return;
        }
        endpoints.updateEndPoint(id, name, description, address, (result) => {
            if (result == true) {
                res.json({
                    message: "SUCCESS",
                    StatusCode: 200
                });
            } else {

            }
        });
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
            if (!result) {
                res.status(404).send({
                    message: "Device Not Found",
                    StatusCode: 404
                });
                return;
            }
            if (result === true) {
                res.json({
                    Result: "Device has been deleted successfully!",
                    StatusCode: 200
                });
            } else {
                res.status(400).send({
                    message: "Unable to find endpoint",
                    StatusCode: 400
                });
            }
        });
    });

    router.use((req, res, next) => {
        next(new Error("Not Implemented"));
    });
    app.use("/core/api/v1/", router);

};