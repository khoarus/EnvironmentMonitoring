var crypto = require("crypto");
var db = require("../controllers/database");

function User() {
    this.register = (username, password, firstname, lastname, callback) => {
        var passwordhash = encrypt(password);
        db.connection.query("INSERT INTO userstbl(FirstName, LastName, Username, Password) VALUE(?, ?, ?, ?)", [firstname, lastname, username, passwordhash], (err, result) => {
            callback(result.affectedRows > 0);
        });
    };

    this.login = (username, password, callback) => {
        var passwordhash = encrypt(password);
        db.connection.query("SELECT * FROM userstbl WHERE Username = ? AND Password = ?", [username, passwordhash], (err, result) => {
            if (err) throw err;
            if (result.length > 0) {
                callback(result, true);
            } else {
                callback(null, false);
            }
        });
    };

    function encrypt(data) {

        return crypto.createHash('sha512').update(data).digest("hex");
    };

    this.getUserById = (userId, callback) => {
        db.connection.query("SELECT IdUser ID, Firstname FirstName, Lastname LastName, Username, Password FROM userstbl WHERE IdUser = ?", userId, (err, result) => {
            if (!err) {
                callback(result);
            } else {
                throw err;
            }
        });
    };

    this.getUsers = (callback) => {
        db.connection.query("SELECT IdUser ID, Firstname FirstName, Lastname LastName, Username, Password FROM userstbl", (err, result) => {
            if (err) {
                throw err;
            }
            if (result.lenth > 0) {
                callback(result);
            } else callback(null);
        });
    };

    this.updateUserInformation = (userId, firstname, lastname, username, password, callback) => {
        db.connection.query("UPDATE userstbl User SET FirstName = ?, LastName = ?, Username = ?, Password = ? WHERE IdUser = ?", [firstname, lastname, username, password, userId], (err, result) => {

            if (err) throw err;
            if (result.affectedRows > 0) callback(result);
            else callback(null);
        });
    };

    this.changePassword = (username, password, callback) => {
        var passwordhash = encrypt(password);
        db.connection.query("UPDATE userstbl SET Password = ? WHERE Username = ?", [passwordhash, username], (err, result) => {
            if (err) throw err;
            if (result.affectedRows > 0) {
                callback(true);
            } else callback(false);
        });
    };

    this.deleteUser = (userId, callback) => {
        db.connection.query("DELETE FROM userstbl WHERE IdUser = ?", [userId], (err, result) => {
            if (err) throw err;
            if (result.affectedRows > 0) {
                callback(true);
            } else {
                callback(false);
            }
        });
    };
};

module.exports = new User();