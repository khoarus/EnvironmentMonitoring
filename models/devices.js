function Device() {

    var db = require("../controllers/database");

    this.getDevice = function(idDevice, callback) {
        db.connection.query("SELECT D.id IdDevice, D.name DeviceName, D.description Description, D.unit Unit, D.id_endpoint IDEndPoint, D.minthreshold Min, D.maxthreshold Max, E.name EndPointName, V.value CurrentValue FROM devicetbl D LEFT JOIN endpointtbl E ON E.id = D.id_endpoint LEFT JOIN valuetbl V ON V.id_device = ? ORDER BY V.value DESC LIMIT 1", idDevice, (err, result) => {

            if (err)
                throw err;
            if (result) {
                callback(result)
            } else callback(null);
        });
    };
    this.getAllDevice = function(callback) {
        db.connection.query("SELECT D.id IdDevice, D.name DeviceName, D.description Description, D.unit, D.id_endpoint IDEndPoint, D.minthreshold MinValue, D.maxthreshold MaxValue, E.name EndPointName, V.value CurrentValue FROM devicetbl D LEFT JOIN endpointtbl E ON E.id = D.id_endpoint LEFT JOIN valuetbl V ON V.id_device = IdDevice ORDER BY CurrentValue DESC LIMIT 1", (err, result) => {

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