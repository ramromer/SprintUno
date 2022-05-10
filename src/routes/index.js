let express = require('express');
let router = express.Router();
let mainController = require('../controllers/mainController.js');

/* GET home page. */
router.get('/', mainController.index);
router.get('/carrito', mainController.carrito);
router.get('/detalleproducto/:id', mainController.detalleProducto);
router.get('/productonuevo', mainController.productoNuevo);
router.get('/editarproducto/:id', mainController.editarProducto);
router.get('error', mainController.error);
router.get('*', mainController.notFound);


module.exports = router;
