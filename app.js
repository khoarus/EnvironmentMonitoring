var express = require("express");
var app = express();
var port = process.env.PORT || 8082;
app.listen(port);
require("./configuration")(app);
require("./routes")(app);

console.log("Application is running at PORT: " + port);