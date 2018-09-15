var express = require('express');
var users = require('../module/personModule');



//-Get Persons Data based on userid or email id or all userdata

exports.getPersonInfo = function (req, res) {
    // console.log('****===========token=========== ****', req.body);
    var UserData = {};
    if (req.body.email) {
        UserData = {
            email: req.body.email
        };
    } else if (req.body.userid) {
        UserData = {
            userid: req.body.userid
        };
    } else {
        UserData = '';
    }
    // console.log('****UserData ****', UserData);
    users.userInfo(UserData, function (err, results) {
        if (err) {
            logger.error({
                err: err
            }, 'Error Described');
            res.send({
                "Error": err,
            });
        } else {
            // logger.info('Into the final response', results);
            res.send({
                "error": 0,
                "code": 200,
                "Data": results,
                "Auth": true,
                "Token Data": token
            });
        }
    });
};

//- Create a new Person record.
exports.createPersonInfo = function (req, res) {
    // console.log('**** req.body ****', req.body);
    var personInputData = {
        "userid": req.body.userid,
        "first_name": req.body.first_name,
        "last_name": req.body.last_name,
        "email": req.body.email,
        "address": req.body.address,
        "status": req.body.status,
        "password": req.body.password,
        "userType": req.body.userType,
        "otp": req.body.otp,
        "dob": req.body.dob
    };
    persons.registration(personInputData, function (err, result, EmailID) {
        if (err) {
            res.send({
                "Error Code": 101,
                "Error": err
            });
        } else {
            // create a token
            var token = jwt.sign({
                email: EmailID,
            }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            });
            res.send({
                "error": 0,
                "code": 200,
                "Email": EmailID,
                "Data": result,
                "auth": true,
                "Token": token
            });
        }
    });
};


//-Delete Person by id.
exports.deleteUserInfo = function (req, res) {
    var deletePersonData = {
        email: req.body.email
    }
    users.deleteUser(deleteUserData.email, function (err, result) {
        if (err) {
            res.send({
                'Error Code': 101,
                'Error': err
            });
        } else {
            res.send({
                'Success': 200,
                'Data': result
            });
        }
    });
};
//-Update Person by id.
exports.deleteUserInfo = function (req, res) {
    var deletePersonData = {
        email: req.body.email
    }
    users.deleteUser(deleteUserData.email, function (err, result) {
        if (err) {
            res.send({
                'Error Code': 101,
                'Error': err
            });
        } else {
            res.send({
                'Success': 200,
                'Data': result
            });
        }
    });
};