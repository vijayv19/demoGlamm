// Module dependency
var mysql = require('mysql');

// Created db connection
var connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'demoProject'
});

module.exports.connection = connection;