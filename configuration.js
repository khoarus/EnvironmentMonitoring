var express = require("express");
var bodyparser = require("body-parser");
module.exports = function(app) {
    app.set("view engine", "html");
    app.engine('html', require('ejs').renderFile);
    app.set("views", __dirname + "/views");

    app.use('/public', express.static(__dirname + '/public'));
    app.use(bodyparser.json());
    app.use(bodyparser.urlencoded({ extended: true }));

    /*var router = express.Router();

    router.get("/", (req, res) => {
        res.json({ message: "Welcome to Environment Monitoring API", version: "1.0" });
    });

    app.use("/api/v1/", router);*/
};