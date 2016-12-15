var mysql = require('mysql');
module.exports = () => {
    global.mysql_conn = mysql.createConnection({
        host: "localhost",
        user: "",
        password: "",
        database: ""
    });

    mysql_conn.connect((err) => {
        if (!err) {
            console.log("Database connection established");
        } else {
            console.log("Error occurred when connecting to database server");
        }
    });
};