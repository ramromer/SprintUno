const express = require('express');
const rutas = express.Router();
const mainController = require('../controllers/mainController.js');


rutas.get('/', mainController.home);
rutas.get('/carrito', mainController.carrito);
rutas.get('/detalle_producto', mainController.detalle_producto);
rutas.get('/login', mainController.login);
rutas.get('/registro',mainController.registro);

module.exports=rutas;