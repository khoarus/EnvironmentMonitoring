var crypto = require("crypto");
var db = require("../controllers/database");

function User() {
    this.register = function(username, password, firstname, lastname, callback) {
        var passwordhash = encrypt(password);
        db.connection.query("INSERT INTO userstbl(FirstName, LastName, Username, Password) VALUE(?, ?, ?, ?)", [firstname, lastname, username, passwordhash], (err, result) => {
            callback(result.affectedRows > 0);
        });
    };

    this.login = function(username, password, callback) {
        var passwordhash = encrypt(password);
        db.connection.query("SELECT * FROM userstbl WHERE Username = ? AND Password = ?", [username, passwordhash], (err, result) => {
            if (err) throw err;
            if (result.length > 0) {
                callback(result);
            } else {
                callback(null);
            }
        });
    };

    function encrypt(data) {
        return crypto.createHash('md5').update(data).digest("hex");
    }

    this.getUserById = function(userId, callback) {
        db.connection.query("SELECT * FROM userstbl WHERE IdUser = ?", userId, (err, result) => {
            if (!err) {
                callback(result);
            } else {
                throw err;
            }
        });
    }

    this.changePassword = function(username, password, callback) {
        var passwordhash = encrypt(password);
        db.connection.query("UPDATE userstbl SET Password = ? WHERE Username = ?", [passwordhash, username], (err, result) => {
            if (err) throw err;
            if (result.affectedRows > 0) {
                callback(true);
            } else callback(false);
        });
    };
};


module.exports = new User();