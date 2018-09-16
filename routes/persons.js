// Module Dependency

var express = require('express');
var router = express.Router();
var personcontroller = require('../Controller/personController');


// Define routes to call person controller functions

router.get('/findData', personcontroller.getPersonInfo);
router.post('/createPersonData', personcontroller.createPersonInfo);
router.put('/updatePersonData', personcontroller.updatePersonInfo);
router.post('/deletePerson', personcontroller.deletePersonInfo);

module.exports = router;