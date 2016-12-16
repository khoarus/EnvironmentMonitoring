function EndPoint() {
    var db = require("../database");

    this.addEndPoint = function() {
        var res = false;
        db.connection.query("", (err, result) => {

        });
    }
    this.getEndPoint = function() {

    }
    this.getEndPointById = function(IdEndPoint) {

    }
};

module.exports = new EndPoint();