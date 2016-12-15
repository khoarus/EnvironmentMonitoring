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

    function generateSalt() {
        return crypto.randomBytes(Math.ceil(8 / 2)).toString("hex").slice(0, 8);
    };

    function get512hash(password, salt) {
        var hash = crypto.createHmac('sha512', salt);
        hash.update(password);
        var value = hash.digest("hex");
        return {
            salt: salt,
            passwordHash: value
        };
    };

    function getPasswordHash(userPassword) {
        var salt = generateSalt();
        passwordData = get512hash(userPassword, salt);
        return passwordData.passwordHash;
    }

    this.changePassword = function(username, password) {
        db.acquire((err, conn) => {
            conn.query("update ", (err, result) => {

            });
        });
    };
};

module.exports = new User();