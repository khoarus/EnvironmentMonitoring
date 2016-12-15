var mysql = require('mysql');

function Database() {
    this.initial = () => {
        this.pool = mysql.createPool({
            connectionLimit = 10,
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'enviromentMonitoring'
        });
    };

    this.acquire = (callback) => {
        this.pool.getConnection((err, connection) => {
            callback(err, connection);
        });
    };
};

module.exports = new Database();