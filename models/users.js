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
            con.query("insert into userstbl", (err, result) => {
                con.release();
                res = result;
            });
        });
        return res;
    };

    this.login = function(username, password) {
        var res = false;
        db.acquire((err, con) => {
            con.query("select count(*) as userCount from userstbl where Username = ? and Password = ?", [username, password], (err, result) => {
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
            conn.query("update ", (err, result) => {

            });
        });
    };
};

module.exports = new User();