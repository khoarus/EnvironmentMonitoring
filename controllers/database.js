var mysql = require('mysql');

function Database() {
    this.connection = mysql.createConnection({
        host: '203.113.167.3',
        user: 'root',
        password: '@Hueic2016',
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