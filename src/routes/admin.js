var express = require('express');
var router = express.Router();
var usersController = require('../controllers/usersControllers.js');

/* GET users listing. */
router.get('/', usersController.admin);

module.exports = router;
