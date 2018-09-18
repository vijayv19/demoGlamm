var express = require('express');
var person = require('../module/personModule');



//-Get Persons Data based on userid or email id or all userdata
exports.getPersonInfo = function (req, res) {
    var personData = {};
    if (req.body.email) {
        personData = {
            email: req.body.email
        };
    } else if (req.body.userid) {
        personData = {
            userid: req.body.userid
        };
    } else {
        personData = '';
    }
    // console.log('****personData ****', personData);
    person.personInfo(personData, function (err, results) {
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
            });
        }
    });
};

//- Create a new Person record.
exports.createPersonInfo = function (req, res) {
    // console.log('**** req.body ****', req.body);
    var personInputData = {
        "personid": req.body.personid,
        "name": req.body.name,
        "email": req.body.email,
        "mobile": req.body.mobile,
        "address": req.body.address,
    };
    person.addPerson(personInputData, function (err, result) {
        if (err) {
            res.send({
                "Error Code": 101,
                "Error": err
            });
        } else {
            res.send({
                "error": 0,
                "code": 200,
                "Data": result,
            });
        }
    });
};


//-Delete Person by id.
exports.deletePersonInfo = function (req, res) {
    console.log('**** reqdeletePersonInfo body ****', req.body);
    var deletePersonData = {
        personid: req.body.personid
    };
    person.deletePerson(deletePersonData.personid, function (err, result) {
        if (err) {
            res.send({
                'Error Code': 101,
                'Error': err
            });
        } else {
            res.send({
                'code': 200,
                'Data': result
            });
        }
    });
};

//-Update Person Records.
exports.updatePersonInfo = function (req, res) {
    console.log('**** update      req.body  ****', req.body);


    var update = req.body;
    // var update = "update persons set address = 'andheri'  where personid = 344";

    person.updatePerson(update, function (err, result) {
        if (err) {
            res.send({
                'Error Code': 101,
                'Error': err
            });
        } else {
            res.send({
                'code': 200,
                'Data': result
            });
        }
    });
};