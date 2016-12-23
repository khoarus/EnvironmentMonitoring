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
    //users

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

    router.route('/users/role').put((req, res) => {
        var id = req.query.id,
            roleid = req.query.roleid;
        if (!id || !roleid) {
            res.status(400).send({
                message: "Required fields is not null or empty",
                StatusCode: 400
            });
            return;
        }
        users.changeRole(id, roleid, (result) => {
            if (!result) {
                res.status(404).send({
                    message: "Can't not find an user with ID: " + id,
                    StatusCode: 404
                });
                return;
            }
            if (result == true) {
                res.json({
                    Result: "SUCCESS",
                    StatusCode: 200
                });
            } else {
                res.status(408).send({
                    Result: "FAILED",
                    StatusCode: 408
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
        var idEndPoint = req.query.endpointcode,
            name = req.query.devicename,
            description = req.query.description,
            unit = req.query.unit,
            max = req.query.maxthreshold,
            min = req.query.minthreshold;

        if (!idEndPoint || !name || !description || !unit || !max || !min) {
            res.status(400).send({
                message: "Bad Request",
                StatusCode: 400
            });
            return;
        }
        devices.addDevice(idEndPoint, name, description, unit, min, max, (result) => {
            if (!result) {

            }
            if (result === true) {
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
        var id = req.query.deviceCode;
        var endpoint = req.query.endpointCode
        var device_name = req.query.name;
        var description = req.query.description;
        var unit = req.query.unit;
        var min = req.query.min;
        var max = req.query.max;

        if (!endpoint || !id || !description || !unit || unit === "" || !min || !max && max < min) {
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
                    message: "The device has been deleted successfully!"
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
    router.route('/values/fetch/latest/:devicecode').get((req, res) => {
        var id = req.params.devicecode;
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
    router.route('/values/update/').put((req, res) => {
        var device = req.query.deviceCode,
            idValue = req.query.valueCode,
            idendpoint = req.query.endpointCode,
            time = req.query.time,
            value = req.query.value;
        if (!device || !idValue || !value || !idendpoint || !time) {
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

    //Add and put value
    router.route('/values/push').get((req, res) => {
        var device = req.query.devicecode;
        var value = req.query.value;
        if (!device || !value) {
            res.status(400).send({
                message: "Required fields is needed to create value",
                StatusCode: 400
            });
            return;
        }
        values.postValue(value, device, (result) => {
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
        console.log('id = ' + id);
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
        var name = req.query.endpointName;
        var description = req.query.description;
        var address = req.query.address;
        var userid = req.query.userId;
        if ((!name || name == "") || (!description || description == "") || (!address || address == "") || !userid) {
            res.status(400).send({
                message: "Required fields not null or empty",
                StatusCode: 400
            });
            return;
        }
        endpoints.addEndPoint(name, description, address, userid, (result) => {
            if (!result) {
                res.status(409).send({
                    message: "Endpoint name conflict",
                    StatusCode: 409
                });
            }
            if (result == true) {
                res.json({
                    message: "Endpoints has been created successfully!",
                    StatusCode: 200
                });
            } else {
                res.status(400).send({
                    message: "Can't add this endpoint",
                    StatusCode: 400
                });
            }
        });
    });

    router.route('/endpoints/update').put((req, res) => {
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
                    Result: "Endpoint has been deleted successfully!",
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