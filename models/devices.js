function Device() {

    var db = require("../database");

    this.getDevice = function(idDevice) {
        var res = false;
        db.connection.query("SELECT * FROM devicetbl WHERE id=?", idDevice, (err, result) => {
            if (err)
                throw err;
            if (!result) {
                res = result;
            } else res = null;
        });
        return res;
    };
    this.getAllDevice = function() {
        var res = false;
        db.connection.query("SELECT * FROM devicetbl ORDER BY name ASC limit 0,10", (err, result) => {
            if (err)
                throw err;
            if (!result) {
                res = result;
            } else res = null;
        });
        return res;
    };
    this.addDevice = function(idEndPoint, name, description, unit, minthreshold, maxthreshold) {
        var res = false;
        db.connection.query("insert into devicetbl(id_endpoint, name, description, unit, minthreshold, maxthreshold) values(?, ?, ?, ?, ?, ?)", [idEndPoint, name, description, unit, minthreshold, maxthreshold], (err, result) => {
            if (err) throw err;
            if (result.rowsAffected > 0) res = true;
            else res = false
        });
        return res;
    }
    this.deleteDevice = function(idDevice) {
        var res = false;
        db.connection.query("delete from devicetbl where id=?", idDevice, (err, result) => {
            if (err) throw err;
            if (result.rowsAffected > 0) res = true;
            else res = false;
        });
        return res;
    }
    this.updateDeviceInfo = function(idDevice, name, description, unit, minthreshold, maxthreshold) {
        var res = false;
        db.connection.query("update devicetbl set name = ?, description = ?, unit = ? minthreshold = ?, maxthreshold = ? where id = ?", [name, description, unit, minthreshold, maxthreshold, idDevice], (err, result) => {
            if (err) throw err;
            if (result.rowsAffected > 0) res = true;
            else res = false;
        });
        return res;
    }
};
module.exports = new Device();