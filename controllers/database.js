var mysql = require('mysql');

function Database() {
    this.connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'enviromentmonitoring',
        multipleStatements: true
    })
    this.connection.connect();
};

module.exports = new Database();