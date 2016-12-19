function EndPoint() {
    var db = require("../controllers/database");

    this.addEndPoint = (name, description, address, callback) => {
        db.connection.query("SELECT * FROM endpointtbl WHERE name = ?", name, (err, result) => {
            if (err) throw err;
            if (result.length > 0) {
                db.connection.query("INSERT INTO endpointtbl(name, description, address) VALUES(?, ?, ?)", [name, description, address], (err, result) => {
                    if (err) throw err;
                    if (result.affectedRows > 0) {
                        callback(true);
                    } else
                        callback(false);
                });
            } else callback(null);
        });
    };
    this.getEndPoints = (callback) => {
        db.connection.query("SELECT E.id ID, E.name, E.description Description, E.address Address, E.id_user OwnerID, U.username OwnerName FROM endpointtbl E LEFT JOIN userstbl U ON U.IdUser = E.id_user", (err, result) => {
            if (err) throw err;
            if (result.length > 0) {
                callback(result);
            } else {
                callback(null);
            }
        });
    };
    this.getEndPointById = (IdEndPoint, callback) => {
        db.connection.query("SELECT E.id ID, E.name, E.description Description, E.address Address, E.id_user OwnerID, U FROM endpointtbl E LEFT JOIN userstbl U ON U.IdUser = E.id_user WHERE E.id = ?", IdEndPoint, (err, result) => {
            if (err) throw err;
            if (result.length > 0) {
                callback(result);
            } else callback(null);
        });
    };

    this.deleteEndPoint = (IdEndPoint, callback) => {
        db.connection.query("SELECT * FROM endpointtbl WHERE id = ?", IdEndPoint, (err, result) => {
            if (err) throw err;
            if (result.length > 0) {
                db.connection.query("DELETE FROM endpointtbl WHERE id = ?", IdEndPoint, (err, result) => {
                    if (err) throw err;
                    if (result.affectedRows > 0) {
                        callback(true);
                    } else {
                        callback(false);
                    }
                });
            } else {
                callback(null);
            }
        });
    };

    this.updateEndPoint = (id, name, description, address, callback) => {
        db.connection.query("SELECT * FROM endpointtbl WHERE id = ?", id, (err, result) => {
            if (err) throw err;
            if (result.length > 0) {
                db.connection.query("UPDATE endpointtbl SET name = ?, description = ?, address = ? WHERE id = ?", [id, name, description, address], (err, result) => {
                    if (err) throw err;
                    if (result.affectedRows > 0) {
                        callback(true);
                    } else {
                        callback(false);
                    }
                });
            } else {
                callback(null);
            }
        });
    };
}

module.exports = new EndPoint();