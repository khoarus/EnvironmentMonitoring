function Values() {
    var db = require("../controllers/database");

    this.postValue = (value, idDevice, callback) => {
        db.connection.query("SELECT * FROM devicetbl WHERE id = ?", idDevice, (err, result) => {
            if (err) throw err;
            if (result && result.length > 0) {
                db.connection.query("INSERT valuetbl(id_device, value) VALUE(?,?)", [idDevice, value], (err, result) => {
                    if (err) throw err;
                    if (result.affectedRows >= 0) {
                        callback(true);
                    } else {
                        callback(false);
                    }
                });
            } else {
                callback(null);
            }
        })
    };

    this.getValue = (idDevice, callback) => {
        db.connection.query("SELECT V.id IdValue, V.id_device IdDevice, V.time Time, V.value Value FROM valuetbl V LEFT JOIN devicetbl D ON D.id = V.id_device WHERE V.id_device = ?", idDevice, (err, result) => {
            if (err) throw err;
            if (result.length > 0) {
                callback(result);
            } else callback(null);
        });
    };

    this.getLatestValue = (idDevice, callback) => {
        db.connection.query("SELECT V.id IDValue, V.id_device IDDevice, D.name DeviceName, V.time Time, V.value Value FROM valuetbl V LEFT JOIN devicetbl D ON D.id = V.id_device WHERE V.id_device = ? ORDER BY V.time DESC LIMIT 1", idDevice, (err, result) => {
            if (err) throw err;
            if (result.length > 0) {
                callback(result);
            } else {
                callback(null);
            }
        });
    };

    this.changeValue = (idValue, idDevice, value, callback) => {
        db.connection.query("UPDATE valuetbl SET value = ? WHERE id = ? AND id_device = ?", [value, idValue, idDevice], (err, result) => {
            if (err) throw err;
            if (result.affectedRows >= 0) {
                callback(result);
            } else callback(null);
        });
    };

    this.deleteValue = (id, callback) => {
        db.connection.query("SELECT * FROM valuetbl WHERE id = ?", id, (err, result) => {
            if (err) throw err;
            if (result.length > 0) {
                db.connection.query("DELETE FROM valuetbl WHERE id = ?", id, (err, res) => {
                    if (err) throw err;
                    if (res.affectedRows >= 0) {
                        callback(res);
                    } else {
                        callback(null);
                    }
                });
            } else {
                callback(result.length);
            }
        });
    }
}
module.exports = new Values();