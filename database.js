var mysql = require('mysql');

function Database() {
    this.connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'environmentmonitoring'
    }).connect();
};

module.exports = new Database();