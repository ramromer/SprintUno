let express = require('express');
let router = express.Router();
let categoryAPIControllers = require('../../controllers/API/categoryAPIControllers.js');


router.get('/categories', categoryAPIControllers.getCategories);
router.get('/categories/:id', categoryAPIControllers.getCategory);


module.exports = router;