const path = require('path');

let mainController = {
    index: (req,res) => {
        res.render('index.ejs')
    },

    detalleProducto: (req, res) => {
        res.render('detalleProducto.ejs')
    },
}

module.exports = mainController;