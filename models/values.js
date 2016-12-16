function Values() {
    var db = require("../database");

    this.putValue = (value, time, idDevice) => {
        var res = false;
        db.connection.query("insert valuetbl(id_device, time, value) values(?, ?, ?)", [idDevice, time, value], (err, conn) => {

        });
    }

    this.getValue = (idDevice) => {

    }

    this.changeValue = (idValue, value) => {

    }
};
module.exports = new Values();