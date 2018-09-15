var express = require('express');
// var database = require('../Database/database');
var _ = require('lodash');


//- Get User data by email,passing req through body.
module.exports.personInfo = function (personsData, callback) {
    database.connection.getConnection(function (err, connection) {
        if (err) {
            throw err;
        } else {
            var query, obj;
            if (!_.isEmpty(personsData.email)) {
                query = 'SELECT * FROM persons WHERE email = ?';
                obj = personsData.email;
            } else if (personsData.userid) {
                query = 'SELECT * FROM persons WHERE userid = ?';
                obj = personsData.userid;
            } else {
                query = 'SELECT * FROM persons';
                obj = personsData;
            }
            // console.log('**** obj ****', obj);
            connection.query(query, obj, function (err, results) {
                if (err) {
                    logger.error({
                        err: err
                    }, 'Error Described');
                    callback(err, null);
                } else if (_.isEmpty(results)) {
                    // results will have value null, if data is not available in the collection/table
                    callback(null, 'noDataFound');
                } else {
                    callback(null, results);
                }
            });
            connection.release();
        }
    });
};

//Create new user.
module.exports.registration = function (userData, callback) {
    database.connection.getConnection(function (err, connection) {
        if (err) {
            throw err;
        } else {
            connection.query('INSERT INTO persons SET ?', userData, function (err, rows) {
                if (err) {
                    callback(err, null);
                } else if (_.isEmpty(userData)) {
                    callback(null, 'noDataFound');
                } else {
                    callback(null, userData, rows.insertId);
                }
            });
        }
    });
};

// Delete User on the basis of email id
module.exports.deletePerson = function (deleteData, callback) {
    database.connection.getConnection(function (err, connection) {
        if (err) {
            throw err;
        } else {
            connection.query('DELETE FROM persons WHERE email = ?', deleteData, function (err, rows) {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, rows);
                }
            });
        }
    });
};

// Update Person Table Records.
module.exports.updatePerson = function (deleteData, callback) {
    database.connection.getConnection(function (err, connection) {
        if (err) {
            throw err;
        } else {
            connection.query('update table persons set email = ', deleteData, function (err, rows) {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, rows);
                }
            });
        }
    });
};