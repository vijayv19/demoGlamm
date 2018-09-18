// Module dependencies

var express = require('express');
var mysql = require('mysql');
var cors = require('cors');
var personRouter = require('./routes/persons');
var bodyParser = require('body-parser');

var app = express();
app.use(cors())
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static(__dirname + "/public"));


// parse application/json
app.use(bodyParser.json());


// Create connection to db

// const sqlConnection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'password',
//     database: 'demoProject',
// });

// Db Connectivity

// sqlConnection.connect(function (err) {
//     if (err) {
//         console.log('**** DB connection failed****', err);
//     } else {
//         console.log('**** DB connected successfully****');

//     }
// });

// console.log('***process.env.NODE_ENV ****', app.settings.env);


//-create DB demoProject

// app.get('/createdb', function (req, res) {
//     let sql = 'CREATE DATABASE demoProject';
//     sqlConnection.query(sql, function (err, found) {
//         if (err)
//             throw err;
//         console.log('Db created' + found);
//         res.send('Db created successfully..');
//     });
// });


// calls the Person router
app.use('/Person', personRouter);

// Listening on port 3002

app.listen('3002', function (err) {
    if (err)
        throw err;
    console.log('**** Server started on port 3002 ****');
});