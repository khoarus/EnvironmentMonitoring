var mysql = require('mysql');

function Database() {
    this.initial = () => {
        this.pool = mysql.createPool({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'enviromentmonitoring'
        });
    };

    this.acquire = (callback) => {
        this.pool.getConnection((err, connection) => {
            callback(err, connection);
        });
    };
};

module.exports = new Database();