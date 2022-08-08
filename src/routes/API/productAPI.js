let express = require('express');
let router = express.Router();
let productsController = require('../../controllers/API/productAPIControllers.js');


router.get('/products', productsController.getProducts);
router.get('/products/:id', productsController.getProduct);

module.exports = router;