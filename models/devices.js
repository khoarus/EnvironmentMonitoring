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

    }
};
module.exports = new Device();