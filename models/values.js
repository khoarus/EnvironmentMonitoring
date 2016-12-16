function Values() {
    var db = require("../database");

    this.putValue = function(value, time, idDevice) {
        var res = false;
        db.connection.query("insert valuetbl(id_device, time, value) values(?, ?, ?)", [idDevice, time, value], (err, conn) => {

        });
    }

    this.getValue = function(idDevice) {

    }


};
module.exports = new Values();