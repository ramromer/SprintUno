let express = require('express');
let router = express.Router();
let usersController = require('../../controllers/API/userAPIControllers.js');


router.get('/users', usersController.getUsers);
router.get('/users/:id', usersController.getUser);

module.exports = router;