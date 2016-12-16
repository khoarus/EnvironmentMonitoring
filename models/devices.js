function Device() {

    var db = require("../database");

    this.getDevice = function(idDevice) {
        db.acquire((err, conn) => {
            conn.query("SELECT * FROM devicetbl WHERE id=?", idDevice, (err, result) => {
                if (err)
                    throw err;

            });
        });
    };
    this.getAllDevice = function() {
        db.acquire((err, conn) => {
            conn.query("SELECT * FROM devicetbl", (err, result) => {
                if (err)
                    throw err;
            });
        });
    };
    this.addDevice = function(idEndPoint, name, description, unit, minthreshold, maxthreshold) {
        var res = false;
        db.acquire((err, conn) => {
            conn.query("insert into devicetbl(id_endpoint, name, description, unit, minthreshold, maxthreshold) values(?, ?, ?, ?, ?, ?)", [idEndPoint, name, description, unit, minthreshold, maxthreshold], (err, result) => {
                if (err) throw err;
                if (result.rowsAffected > 0) res = true;
                else res = false
            });
        });
        return res;
    }
};
module.exports = new Device();