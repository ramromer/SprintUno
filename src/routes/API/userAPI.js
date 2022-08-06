let express = require('express');
let router = express.Router();
let usersController = require('../../controllers/API/userAPIControllers.js');
const db = require('../../data/models');


router.get('/users', usersController.getUsers);
router.get('/users/:id', usersController.getUser);

module.exports = router;