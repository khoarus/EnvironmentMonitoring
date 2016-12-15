function User() {
    var crypto = require("crypto");
    var db = require("../database.js");

    this.idUser;
    this.username;
    this.password;
    this.firstname;
    this.lastname;

    this.register = function(username, password, firstname, lastname) {
        var res = null;
        db.acquire((err, con) => {
            var passwordhash = encrypt(password);
            con.query("insert into userstbl(FirstName, LastName, Username, Password) values(?, ?, ?, ?)", [firstname, lastname, username, passwordhash], (err, result) => {
                con.release();
                res = result.affectedRows;
            });
        });
        return res;
    };

    this.login = function(username, password) {
        var res = false;
        db.acquire((err, con) => {
            var passwordhash = encrypt(password);
            con.query("select count(*) as userCount from userstbl where Username = ? and Password = ?", [username, passwordhash], (err, result) => {
                con.release();
                if (!err) {
                    if (result[0].userCount > 0) {
                        res = true;
                    } else res = false;
                } else res = false;
            });
        });
        return res;
    };

    function encrypt(text) {
        var cipher = crypto.createCipher("sha512", 'd6F3Efeq')
        var crypted = cipher.update(text, 'utf8', 'hex')
        crypted += cipher.final('hex');
        return crypted;
    }

    this.changePassword = function(username, password) {
        db.acquire((err, conn) => {
            var passwordhash = encrypt(password);
            conn.query("update userstbl set Password = ? where Username = ?", [passwordhash, username], (err, result) => {

            });
        });
    };
};

module.exports = new User();