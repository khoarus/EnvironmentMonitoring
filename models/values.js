function Values() {
    var db = require("../controllers/database");
    this.putValue = (value, time, idDevice, callback) => {
        db.connection.query("INSERT valuetbl(id_device, time, value) VALUE(?, ?, ?)", [idDevice, time, value], (err, result) => {
            if (err) throw err;
            if (result.affectedRows > 0) {
                callback(true);
            } else {
                callback(false);
            }
        });
    };

    this.getValue = (idDevice, callback) => {
        db.connection.query("SELECT V.id IdValue, V.id_device IdDevice, V.time Time, V.value Value FROM valuetbl V LEFT JOIN devicetbl D ON D.id = IdDevice WHERE IdDevice = ?", idDevice, (err, result) => {
            if (err) throw err;
            if (result.length > 0) {
                callback(result);
            } else callback(null);
        });
    };

    this.getLatestValue = (idDevice, callback) => {
        db.connection.query("SELECT * FROM valuetbl ORDER BY time DESC LIMIT 1 WHERE id_device = ?", idDevice, (err, result) => {
            if (err) throw err;
            if (result.length > 0) {
                callback(result);
            } else {
                callback(null);
            }
        });
    };

    this.changeValue = (idValue, idDevice, value, callback) => {
        db.connection.query("UPDATE valuetbl SET value = ? WHERE id = ? AND id_device ?", [value, idValue, idDevice], (err, result) => {
            if (err) throw err;
            if (result.affectedRows > 0) {
                callback(result);
            } else callback(null);
        });
    };
}
module.exports = new Values();