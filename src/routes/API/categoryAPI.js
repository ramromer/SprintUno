let express = require('express');
let router = express.Router();
let categoryAPIControllers = require('../../controllers/API/categoryAPIControllers.js');


router.get('/category', categoryAPIControllers.getCategories);


module.exports = router;