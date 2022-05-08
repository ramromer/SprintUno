var express = require('express');
var router = express.Router();
var mainController = require('../controllers/mainController.js');

/* GET home page. */
router.get('/', mainController.index);

router.get('/detalleproducto/:id', mainController.detalleProducto);

router.get('/productoNuevo', mainController.productoNuevo);

module.exports = router;
