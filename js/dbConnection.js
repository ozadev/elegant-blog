var mysql = require('promise-mysql');

var pool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'todos'
    // database: 'elegant-blog'
});

function getSqlConnection() {
    return pool.getConnection().disposer(function(connection) {
        pool.releaseConnection(connection);
    });
}

module.exports = getSqlConnection;