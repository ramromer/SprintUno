const path = require('path');

let mainController = {
    home: (req,res) => {
        res.sendFile(path.join(__dirname,'../public/views/home/home.html'))},
    
    carrito: (req,res) => {
        res.sendFile(path.join(__dirname,'../public/views/carrito/carrito.html'))},
    
    detalle_producto: (req,res) => {
        res.sendFile(path.join(__dirname,'../public/views/detalle_producto/detalle_producto.html'))},
    
    login: (req,res) => {
        res.sendFile(path.join(__dirname,'../public/views/login_registro/login.html'))},

    registro: (req,res) => {
        res.sendFile(path.join(__dirname,'../public/views/login_registro/registro.html'))},
}
module.exports = mainController;