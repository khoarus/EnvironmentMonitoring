function Device() {

    var db = require("../controllers/database");

    this.getDevice = function(idendpoint, idDevice, callback) {
        db.connection.query("SELECT * FROM devicetbl D WHERE D.id_endpoint = ? AND D.id = ? LEFT JOIN valuetbl V ON D.id = V.id_device LEFT JOIN endpointtbl E ON D.id_endpoint = E.id ORDER BY V.time DESC LIMIT 1", idendpoint, idDevice, (err, result) => {
            console.log(result);
            if (err)
                throw err;
            if (result) {
                callback(result);
            } else callback(null);
        });
    };

    this.getAllDevice = function(idendpoint, callback) {
        db.connection.query("SELECT * FROM devicetbl D LEFT JOIN valuetbl V ON D.id = V.id_device LEFT JOIN endpointtbl E ON D.id_endpoint = E.id WHERE D.id_endpoint = ? ORDER BY V.time DESC LIMIT 1 ", idendpoint, (err, result) => {
            if (err)
                throw err;
            if (result && result.length > 0) {
                callback(result);
            } else {
                callback(null);
            }
        });
    };
    this.addDevice = function(idEndPoint, name, description, unit, minthreshold, maxthreshold, callback) {
        db.connection.query("SELECT * FROM devicetbl WHERE name = ?", name, (err, result) => {
            if (err) throw err;
            if (result.length > 0) {
                db.connection.query("INSERT INTO devicetbl(id_endpoint, name, description, unit, minthreshold, maxthreshold) VALUES(?, ?, ?, ?, ?, ?)", [idEndPoint, name, description, unit, minthreshold, maxthreshold], (err, result) => {
                    if (err) throw err;
                    if (result.affectedRows >= 0)
                        callback(true);
                    else
                        callback(false);
                });
            } else {
                callback(null);
            }
        });
    };
    this.deleteDevice = function(idDevice, callback) {
        db.connection.query("DELETE FROM devicetbl WHERE id=?", idDevice, (err, result) => {
            if (err) throw err;
            console.log(result);
            if (result.affectedRows >= 0)
                callback(true);
            else
                callback(false);
        });
    };
    this.updateDeviceInfo = function(idDevice, name, description, unit, minthreshold, maxthreshold, callback) {
        db.connection.query("SELECT * FROM devicetbl WHERE id = ?", idDevice, (err, result) => {
            if (err) throw err;
            if (result.length > 0) {
                db.connection.query("UPDATE devicetbl SET name = ?, description = ?, unit = ? minthreshold = ?, maxthreshold = ? WHERE id = ?", [name, description, unit, minthreshold, maxthreshold, idDevice], (err, result) => {
                    if (err) throw err;
                    if (result.affectedRows >= 0)
                        callback(true);
                    else
                        callback(false);
                });
            } else {
                callback(null);
            }
        });
    };
}
module.exports = new Device();