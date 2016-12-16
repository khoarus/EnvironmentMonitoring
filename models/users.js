var crypto = require("crypto");
var db = require("../database.js");

function User() {


    this.register = function(username, password, firstname, lastname) {
        var res = null;
        var passwordhash = encrypt(password);
        db.connection.query("insert into userstbl(FirstName, LastName, Username, Password) values(?, ?, ?, ?)", [firstname, lastname, username, passwordhash], (err, result) => {
            res = result.affectedRows > 0;
        });
        return res;
    };

    this.login = function(username, password) {
        var res = false;

        var passwordhash = encrypt(password);
        db.connection.query("select count(*) as userCount from userstbl where Username = ? and Password = ?", [username, passwordhash], (err, result) => {
            if (!err) {
                if (result[0].userCount > 0) {
                    res = true;
                } else res = false;
            } else res = false;
        });
        return res;
    };

    function encrypt(data) {
        return crypto.createHash('md5').update(data).digest("hex");
    }

    this.getUserById = function(userId) {
        var res;
        db.connection.query("select * from userstbl where IdUser = ?", userId, (err, result) => {
            if (!err) {
                res = result;
            } else {
                throw err;
            }
        });
        return res;
    }

    this.changePassword = function(username, password) {
        var passwordhash = encrypt(password);
        db.connection.query("update userstbl set Password = ? where Username = ?", [passwordhash, username], (err, result) => {

        });
    };
};


module.exports = new User();