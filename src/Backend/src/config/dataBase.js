const mysql = require("mysql2/promise");

const connection = mysql.createPool({
    host: "localhost",
    user: "root",
    database: "bandienthoai",
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
});

module.exports = connection;

// const mysql = require("mysql2/promise");

// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     database: 'bandienthoai',
//     port: '3307',
//     password: '123456'
// });

// module.exports = connection;
