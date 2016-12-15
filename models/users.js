function User() {

    var db = require("../database.js");

    this.idUser;
    this.username;
    this.password;
    this.firstname;
    this.lastname;

    this.register = function(username, password, firstname, lastname) {
        db.acquire((err, con) => {
            con.query("insert into usertbl", (err, result) => {
                con.release();
                return result;
            });
        });
    };

    this.login = function(username, password) {
        db.acquire((err, con) => {
            con.query("select * from usertbl", (err, result) => {

            });
        });
    };
};

module.exports = new User();