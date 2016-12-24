var crypto = require("crypto");
var db = require("../controllers/database");

function User() {
    this.register = (username, password, firstname, lastname, callback) => {
        db.connection.query("SELECT * FROM userstbl WHERE Username = ?", username, (err, result) => {
            if (err) console.log(err);
            else {
                if (result.length > 0) {
                    callback(false);
                }
                if (result.length === 0) {
                    var passwordhash = encrypt(password);
                    db.connection.query("INSERT INTO userstbl(FirstName, LastName, Username, Password, id_role) VALUE(?, ?, ?, ?, 2)", [firstname, lastname, username, passwordhash], (err, result) => {
                        if (err) console.log(err);
                        if (result.affectedRows >= 0) {
                            callback(true);
                        } else {
                            callback(false);
                        }
                    });
                }
            }
        });
    };

    this.login = (username, password, callback) => {
        var passwordhash = encrypt(password);
        db.connection.query("SELECT U.IdUser ID, U.Firstname FirstName, U.LastName LastName, U.Username, U.Password, R.role Role FROM userstbl U LEFT JOIN roletbl R ON R.id = U.id_role WHERE U.Username = ? AND U.Password = ?", [username, passwordhash], (err, result) => {
            if (err) console.log(err);
            if (result.length > 0) {
                callback(result, true);
            } else {
                callback(null, false);
            }
        });
    };

    function encrypt(data) {

        return crypto.createHash('sha512').update(data).digest("hex").toUpperCase();
    }

    this.getUserById = (userId, callback) => {
        db.connection.query("SELECT U.IdUser ID, U.Firstname FirstName, U.Lastname LastName, U.Username, U.Password, R.role Role FROM userstbl U LEFT JOIN roletbl R ON R.id = U.id_role WHERE U.IdUser = ?", userId, (err, result) => {
            if (err) console.log(err);
            if (result.length > 0) {
                callback(result);
            } else {
                callback(null);
            }
        });
    };

    this.getUsers = (callback) => {
        db.connection.query("SELECT U.IdUser ID, U.Firstname FirstName, U.Lastname LastName, U.Username, U.Password, R.role Role FROM userstbl U LEFT JOIN roletbl R ON R.id = U.id_role", (err, result) => {
            if (err) {
                console.log(err);
            }
            if (result.length > 0) {
                callback(result);
            } else {
                callback(null);
            }
        });
    };

    this.updateUserInformation = (userId, firstname, lastname, username, password, id_role, callback) => {
        db.connection.query("UPDATE userstbl User SET FirstName = ?, LastName = ?, Username = ?, Password = ?, id_role = ? WHERE IdUser = ?", [firstname, lastname, username, password, id_role, userId], (err, result) => {
            if (err) console.log(err);
            if (result.affectedRows > 0)
                callback(true);
            else
                callback(false);
        });
    };

    this.changeRole = (id_user, id_role, callback) => {
        db.connection.query("SELECT * FROM userstbl WHERE IdUser = ?", id_user, (err, result) => {
            if (err) console.log(err);
            if (result.length > 0) {
                db.connection.query("UPDATE userstbl SET id_role = ? WHERE IdUser = ?", [id_role, id_user], (err, result) => {
                    if (err) console.log(err);
                    if (result.affectedRows > 0) {
                        callback(true);
                    } else {
                        callback(false);
                    }
                });
            } else callback(null);
        });
    }

    this.changePassword = (username, password, callback) => {
        var passwordhash = encrypt(password);
        db.connection.query("UPDATE userstbl SET Password = ? WHERE Username = ?", [passwordhash, username], (err, result) => {
            if (err) console.log(err);
            if (result.affectedRows > 0) {
                callback(true);
            } else {
                callback(false);
            }
        });
    };

    this.deleteUser = (userId, callback) => {
        db.connection.query("DELETE FROM userstbl WHERE IdUser = ?", [userId], (err, result) => {
            if (err) console.log(err);
            if (result.affectedRows > 0) {
                callback(true);
            } else {
                callback(false);
            }
        });
    };
}

module.exports = new User();