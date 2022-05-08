var express = require('express');
var router = express.Router();
var mainController = require('../controllers/mainController.js');

/* GET home page. */
router.get('/', mainController.index);
router.get('/carrito', mainController.carrito);
router.get('/detalleproducto/:id', mainController.detalleProducto);

router.get('/productonuevo', mainController.productoNuevo);

router.get('error', mainController.error);
router.get('*', mainController.notFound);


module.exports = router;
