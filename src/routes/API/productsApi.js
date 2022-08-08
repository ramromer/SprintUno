let express = require('express');
let router = express.Router();
let productsApiController = require('../../controllers/API/productsApiControllers.js');
const db = require('../../data/models');

router.get('/products', productsApiController.getProducts);
// router.get('/products/:id', productsController.getProducts);

module.exports = router;