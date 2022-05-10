var express = require('express');
var router = express.Router();
var usersController = require('../controllers/usersControllers.js');

/* GET users listing. */
router.get('/login', usersController.login);
router.get('/register', usersController.register);
router.get('*', usersController.notFound);

module.exports = router;
