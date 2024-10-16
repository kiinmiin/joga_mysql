// setup databse connection
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "qwerty",
    database: "joga_mysql"
    // can set connection limits and else
});

module.exports = db;