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
};
module.exports = new Device();