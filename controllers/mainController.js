const path = require('path');

var listaUsers =[
    {
        usuarioId: 1,
        nombreCompleto: 'Usuario de Prueba',
        fechaNac: '01/01/2000',
    },
];

var listaBicis = [
    {
        id: 1,
        titulo: 'Orbea Rise',
        descripcionCorta: 'Bicicleta',
        descripcionDetallada: 'Descripcion Ampliada',
        colorDisponible: ["white", "red", "black"],
        tamañoDisponible: ["S", "M", "L"],
        cantidadDisponible: 10,
        precio: '10.000',
        img: ['bicicleta-orbea-rise-m20.jpg', 'bicicleta-orbea-rise-m21.jpg'],
        alt: 'bici',
    },
    {
        id: 2,
        titulo: 'Orbea Rise M21',
        descripcionCorta: 'Bicicleta',
        descripcionDetallada: 'Descripcion Ampliada',
        colorDisponible: ["white", "red", "black"],
        tamañoDisponible: ["S", "M", "L"],
        cantidadDisponible: 3,
        precio: '11.000',
        img: [ 'bicicleta-orbea-rise-m21.jpg'],
        alt: 'bici',
    },
    {
        id: 3,
        titulo: 'Aurorita Plegable',
        descripcionCorta: 'Bicicleta plegable',
        descripcionDetallada: 'Descripcion Ampliada',
        colorDisponible: ["white", "red", "black"],
        tamañoDisponible: ["S", "M", "L"],
        cantidadDisponible: 8,
        precio: '12.000',
        descuento: '10%',
        img: [ 'bicicleta-aurorita-cyan.png'],
        alt: 'bici',
    },
    {
        id: 4,
        titulo: 'Aurorita Plegable',
        descripcionCorta: 'Bicicleta plegable',
        descripcionDetallada: 'Descripcion Ampliada',
        colorDisponible: ["white", "red", "black"],
        tamañoDisponible: ["S", "M", "L"],
        cantidadDisponible: 30,
        precio: '12.000',
        img: [ 'bicicleta-aurorita-green.png'],
        alt: 'bici',
    },
    {
        id: 5,
        titulo: 'Aurorita Plegable',
        descripcionCorta: 'Bicicleta plegable',
        descripcionDetallada: 'Descripcion Ampliada',
        colorDisponible: ["white", "red", "black"],
        tamañoDisponible: ["S", "M", "L"],
        cantidadDisponible: 40,
        precio: '12.000',
        img: [ 'bicicleta-aurorita-orange.png'],
        alt: 'bici',
    },
    {
        id: 6,
        titulo: 'Aurorita Plegable',
        descripcionCorta: 'Bicicleta plegable',
        descripcionDetallada: 'Descripcion Ampliada',
        colorDisponible: ["white", "red", "black"],
        tamañoDisponible: ["S", "M", "L"],
        cantidadDisponible: 2,
        precio: '12.000',
        img: [ 'bicicleta-aurorita-paleyellow.png'],
        alt: 'bici',
    },
    {
        id: 7,
        titulo: 'Topmega',
        descripcionCorta: 'Bicicleta MTB',
        descripcionDetallada: 'Descripcion Ampliada',
        colorDisponible: ["white", "red", "black"],
        tamañoDisponible: ["S", "M", "L"],
        cantidadDisponible: 5,
        precio: '13.000',
        descuento: '10%',
        img: [ 'bicicleta-topmega-cyan.png'],
        alt: 'bici',
    },
    {
        id: 8,
        titulo: 'Topmega',
        descripcionCorta: 'Bicicleta MTB',
        descripcionDetallada: 'Descripcion Ampliada',
        colorDisponible: ["white", "red", "black"],
        tamañoDisponible: ["S", "M", "L"],
        cantidadDisponible: 13,
        precio: '13.000',
        img: [ 'bicicleta-topmega-yellow.png'],
        alt: 'bici',
    },
    {
        id: 9,
        titulo: 'Topmega',
        descripcionCorta: 'Bicicleta MTB',
        descripcionDetallada: 'Descripcion Ampliada',
        colorDisponible: ["white", "red", "black"],
        tamañoDisponible: ["S", "M", "L"],
        cantidadDisponible: 6,
        precio: '13.000',
        img: [ 'bicicleta-topmega-red.png'],
        alt: 'bici',
    },
    {
        id: 10,
        titulo: 'SLP',
        descripcionCorta: 'Bicicleta plegable SLP',
        descripcionDetallada: 'Descripcion Ampliada',
        colorDisponible: ["white", "red", "black"],
        tamañoDisponible: ["S", "M", "L"],
        cantidadDisponible: 7,
        precio: '9.000',
        img: [ 'bicicleta-slp-yellow.png'],
        alt: 'bici',
    },
    {
        id: 11,
        titulo: 'SLP',
        descripcionCorta: 'Bicicleta plegable SLP',
        descripcionDetallada: 'Descripcion Ampliada',
        colorDisponible: ["white", "red", "black"],
        tamañoDisponible: ["S", "M", "L"],
        cantidadDisponible: 10,
        precio: '9.000',
        img: [ 'bicicleta-slp-white.png'],
        alt: 'bici',
    }
]


let mainController = {
    index: (req, res) => {
        res.render('index.ejs',{listaBicis:listaBicis})
    },

    detalleProducto: (req, res) => {
        let reqId = listaBicis.find(element => element.id == req.params.id);
        res.render('detalleProducto', {producto:reqId})
    },

    productoNuevo: (req, res) => {
        res.render('productoNuevo')
    },
};

module.exports = mainController;