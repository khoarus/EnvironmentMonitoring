var express = require("express");

module.exports = function(app) {
    app.set("view engine", "html");
    app.engine('html', require('ejs').renderFile);
    app.set("views", __dirname + "/views");

    app.use('/public', express.static(__dirname + '/public'));
}