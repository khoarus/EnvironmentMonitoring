function Values() {
    var db = require("../database");

    this.putValue = (value, time, idDevice, callback) => {
        db.connection.query("INSERT valuetbl(id_device, time, value) VALUE(?, ?, ?)", [idDevice, time, value], (err, result) => {
            if (err) throw err;
            if (result.affectedRows > 0) {
                callback(true);
            } else {
                callback(false);
            }
        });
    }

    this.getValue = (idDevice, callback) => {
        db.connection.query("SELECT V.id IdValue, V.id_device IdDevice, V.time Time, V.value Value FROM valuetbl V LEFT JOIN devicetbl D ON D.id = IdDevice WHERE IdDevice = ?", idDevice, (err, result) => {
            if (err) throw err;
            if (result.length > 0) {
                callback(true);
            } else callback(false);
        });
    }

    this.getLatestValue = (idDevice, idValue, callback) => {

    }

    this.changeValue = (idValue, value, callback) => {

    }
};
module.exports = new Values();