
const fs=require('fs');
const path=require('path');


let listaBicisFile = fs.readFileSync(path.join(__dirname,'../data/data.json'));
let listaBicis = JSON.parse(listaBicisFile);

let mainController = {
    index: (req, res) => {
        res.render('index.ejs',{listaBicis:listaBicis})
    },

    carrito: (req,res) => {
        res.render('./products/carrito');
    },

    detalleProducto: (req, res) => {
        let reqId = listaBicis.find(element => element.id == req.params.id);
        res.render('./products/detalleProducto', {producto:reqId})
    },

    productoNuevo: (req, res) => {
        res.render('./products/productoNuevo')
    },

    editarProducto: (req, res) => {
        let reqId = listaBicis.find(element => element.id == req.params.id);
        res.render('./products/editarProducto', {producto:reqId})
    },

    error: (req, res) => {
        res.render('error')
    },
}

module.exports = mainController;