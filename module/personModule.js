// Module dependency
var express = require('express');
var database = require('../Database/database');
var _ = require('lodash');

//- Get Person data by passing email or personid in req through body.
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
                query = 'SELECT * FROM persons WHERE personid = ?';
                obj = personsData.userid;
            } else {
                query = 'SELECT * FROM persons';
                obj = personsData;
            }
            connection.query(query, obj, function (err, results) {
                if (err) {
                    callback(err, null);
                } else if (_.isEmpty(results)) {
                    callback(null, 'noDataFound');
                } else {
                    callback(null, results);
                }
            });
            connection.release();
        }
    });
};

//-Create new person.
module.exports.addPerson = function (userData, callback) {
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

//- Delete Person record on the basis of person id
module.exports.deletePerson = function (deleteData, callback) {
    database.connection.getConnection(function (err, connection) {
        if (err) {
            throw err;
        } else {
            connection.query('DELETE FROM persons WHERE personid = ?', deleteData, function (err, rows) {
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
module.exports.updatePerson = function (updateData, callback) {
    var myData = updateData.updateData;
    database.connection.getConnection(function (err, connection) {
        if (err) {
            throw err;
        } else {
            var sql = "UPDATE persons set personid = ? , name = ? ,email = ? ,mobile = ? , address = ? where personid = ?";
            connection.query(sql, [myData.personid, myData.name, myData.email, myData.mobile, myData.address, updateData.personid], function (err, rows) {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, rows);
                }
            });
        }
    });
};