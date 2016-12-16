function Device() {

    var db = require("../controllers/database");

    this.getDevice = function(idDevice, callback) {

        db.connection.query("SELECT D.id, D.name,D.description,D.unit, D.id_endpoint IDEndPoint, D.minthreshold, D.maxthreshold, E.name EndPointName FROM devicetbl D LEFT JOIN endpointtbl E ON E.id = D.id_endpoint WHERE id=?", idDevice, (err, result) => {
            if (err)
                throw err;
            if (result) {
                callback(result)
            } else callback(null);
        });
    };
    this.getAllDevice = function(callback) {

        db.connection.query("SELECT D.name,D.description,D.unit, D.id_endpoint IDEndPoint, D.minthreshold, D.maxthreshold, E.name EndPointName FROM devicetbl D LEFT JOIN endpointtbl E ON E.id = D.id_endpoint ORDER BY D.name ASC limit 0,10", (err, result) => {
            if (err)
                throw err;
            if (result) {
                callback(result);
            } else callback(null);
        });
    };
    this.addDevice = function(idEndPoint, name, description, unit, minthreshold, maxthreshold, callback) {
        db.connection.query("INSERT INTO devicetbl(id_endpoint, name, description, unit, minthreshold, maxthreshold) VALUES(?, ?, ?, ?, ?, ?)", [idEndPoint, name, description, unit, minthreshold, maxthreshold], (err, result) => {
            if (err) throw err;
            if (result.rowsAffected > 0) callback(true);
            else callback(false);
        });
    }
    this.deleteDevice = function(idDevice, callback) {
        db.connection.query("DELETE FROM devicetbl WHERE id=?", idDevice, (err, result) => {
            if (err) throw err;
            if (result.rowsAffected > 0) callback(true);
            else callback(false);
        });
    }
    this.updateDeviceInfo = function(idDevice, name, description, unit, minthreshold, maxthreshold, callback) {
        db.connection.query("UPDATE devicetbl SET name = ?, description = ?, unit = ? minthreshold = ?, maxthreshold = ? WHERE id = ?", [name, description, unit, minthreshold, maxthreshold, idDevice], (err, result) => {
            if (err) throw err;
            if (result.rowsAffected > 0) callback(true);
            else callback(false);
        });
    }
};
module.exports = new Device();