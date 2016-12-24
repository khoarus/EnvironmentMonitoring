function Device() {

    var db = require("../controllers/database");

    this.getDevice = function(idendpoint, iduser, callback) {
        // db.connection.query("SELECT * FROM devicetbl D LEFT JOIN valuetbl V ON D.id = V.id_device LEFT JOIN endpointtbl E ON D.id_endpoint = E.id WHERE D.id_endpoint = ? AND D.id = ? ORDER BY V.time DESC ", [idendpoint, idDevice], (err, result) => {
        db.connection.query("select *,D.id as 'id_device',D.name as 'name_device',D.description as 'description_device' from devicetbl D LEFT JOIN endpointtbl E  ON E.id = D.id_endpoint WHERE E.id_user = ? AND E.id = ? ", [iduser, idendpoint], (err, result) => {
            if (err)
                throw err;
            if (result && result.length > 0) {
                callback(result);
            } else callback(null);
        });
    };

    this.getAllDevice = function(idendpoint, callback) {
        db.connection.query("SELECT *,D.id as id_device FROM devicetbl D LEFT JOIN valuetbl V ON D.id = V.id_device LEFT JOIN endpointtbl E ON D.id_endpoint = E.id WHERE D.id_endpoint = ? ORDER BY V.time DESC  ", idendpoint, (err, result) => {
            if (err)
                throw err; //day akl ủmk
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