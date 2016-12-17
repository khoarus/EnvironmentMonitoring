function EndPoint() {
    var db = require("../controllers/database");
    this.addEndPoint = (name, description, address, callback) => {
        db.connection.query("INSERT INTO endpointtbl(name, description, address) VALUES(?, ?, ?)", [name, description, address], (err, result) => {
            if (err) throw err;
            if (result.affectedRows > 0) {
                callback(true);
            } else callback(false);
        });
    };
    this.getEndPoints = (callback) => {
        db.connection.query("SELECT * FROM endpointtbl", (err, result) => {
            if (err) throw err;
            if (result.length > 0) {
                callback(result);
            } else {
                callback(null);
            }
        });
    };
    this.getEndPointById = (IdEndPoint, callback) => {
        db.connection.query("SELECT * FROM endpointtbl WHERE id = ?", IdEndPoint, (err, result) => {
            if (err) throw err;
            if (result.length > 0) {
                callback(result);
            } else callback(null);
        });
    };

    this.deleteEndPoint = (IdEndPoint, callback) => {
        db.connection.query("DELETE FROM endpointtbl WHERE id = ?", IdEndPoint, (err, result) => {
            if (err) throw err;
            if (result.affectedRows > 0) {
                callback(true);
            } else {
                callback(false);
            }
        });
    };

    this.editEndPoint = (name, description, address, callback) => {
        db.connection.query("UPDATE endpointtbl SET name = ?, description = ?, address = ?", [name, description, address], (err, result) => {
            if (err) throw err;
            if (result.affectedRows > 0) {
                callback(true);
            } else {
                callback(false);
            }
        });
    };
}

module.exports = new EndPoint();