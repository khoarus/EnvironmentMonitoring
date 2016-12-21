function Device() {

    var db = require("../controllers/database");

    this.getDevice = function(idDevice, callback) {
        db.connection.query("SELECT D.id IdDevice, D.name DeviceName, D.description Description, D.unit Unit, D.id_endpoint IDEndPoint, D.minthreshold Min, D.maxthreshold Max, E.name EndPointName, V.value CurrentValue FROM devicetbl D LEFT JOIN endpointtbl E ON E.id = D.id_endpoint LEFT JOIN valuetbl V ON V.id_device = D.id WHERE D.id = ?", idDevice, (err, result) => {
            if (err)
                throw err;
            if (result) {
                callback(result);
            } else callback(null);
        });
    };
    this.getAllDevice = function(callback) {
        db.connection.query("SELECT D.id IdDevice, D.name DeviceName, D.description Description, D.unit, D.id_endpoint IDEndPoint, D.minthreshold Min, D.maxthreshold Max, E.name EndPointName, V.value CurrentValue FROM devicetbl D LEFT JOIN endpointtbl E ON E.id = D.id_endpoint LEFT JOIN valuetbl V ON V.id_device = D.id ", (err, result) => {
            if (err)
                throw err;
            if (result && result.length > 0) {
                callback(result);
            } else callback(null);
        });
    };
    this.addDevice = function(idEndPoint, name, description, unit, minthreshold, maxthreshold, callback) {
        db.connection.query("SELECT * FROM devicetbl WHERE name = ?", name, (err, result) => {
            if (err) throw err;
            if (result.length > 0) {
                db.connection.query("INSERT INTO devicetbl(id_endpoint, name, description, unit, minthreshold, maxthreshold) VALUES(?, ?, ?, ?, ?, ?)", [idEndPoint, name, description, unit, minthreshold, maxthreshold], (err, result) => {
                    if (err) throw err;
                    if (result.rowsAffected > 0)
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
        db.connection.query("SELECT * FROM devicetbl WHERE id = ?", idDevice, (err, result) => {
            if (err) throw err;
            if (result.length > 0) {
                db.connection.query("DELETE FROM devicetbl WHERE id=?", idDevice, (err, result) => {
                    if (err) throw err;
                    if (result.rowsAffected > 0)
                        callback(true);
                    else
                        callback(false);
                });
            } else callback(null);
        });
    };
    this.updateDeviceInfo = function(idDevice, name, description, unit, minthreshold, maxthreshold, callback) {
        db.connection.query("SELECT * FROM devicetbl WHERE id = ?", idDevice, (err, result) => {
            if (err) throw err;
            if (result.length > 0) {
                db.connection.query("UPDATE devicetbl SET name = ?, description = ?, unit = ? minthreshold = ?, maxthreshold = ? WHERE id = ?", [name, description, unit, minthreshold, maxthreshold, idDevice], (err, result) => {
                    if (err) throw err;
                    if (result.rowsAffected > 0)
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