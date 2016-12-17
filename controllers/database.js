var mysql = require('mysql');

function Database() {
    this.connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'enviromentmonitoring',
        multipleStatements: true
    });
    this.connection.connect((err) => {
        if (err) {
            console.error("Error when connecting to MySQL Database: " + err.stack);
            return;
        }
    });
}
module.exports = new Database();