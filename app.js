var express = require("express");
var app = express();
var port = process.env.PORT || 81;
require("./config")(app);
require("./routes")(app);

console.log("Application is running at PORT: " + port);