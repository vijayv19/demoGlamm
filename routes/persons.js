// Module Dependency

var express = require('express');
var router = express.Router();
var personcontroller = require('../Controller/personController');


// Define routes to call person controller functions

router.get('/findData', personcontroller.getPersonInfo);
router.post('/createPersonData', personcontroller.createPersonInfo);
// router.post('/updatePersonData', personcontroller.updatePersonInfo);
router.delete('/deletePerson', personcontroller.deleteUserInfo);

module.exports = router;