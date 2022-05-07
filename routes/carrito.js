const express=require('express');
const carritoController=require('../controllers/carritoController.js');
const routers=express.Router();

routers.get('/',carritoController.index);

module.exports=routers;