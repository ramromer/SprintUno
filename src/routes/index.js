let express = require('express');
let router = express.Router();
let mainController = require('../controllers/mainController.js');
let multer = require('multer');
let path = require('path');
const req = require('express/lib/request');
const fs = require('fs');



const storage = multer.diskStorage({
    destination:  function(req, file, cb) {
        cb(null,'./public/images');
    },
    filename: function (req,file,cb){
        cb(null,`${Date.now()}_img_${path.extname(file.originalname)}`);
    }
})
const uploadFile=multer({storage:storage});

//`` te odio comillas raras

/* GET home page. */
router.get('/', mainController.index);
router.get('/carrito', mainController.carrito);
router.get('/detalleproducto/:id', mainController.detalleProducto);
router.get('/productonuevo', mainController.productoNuevo);
router.get('/editarproducto/:id', mainController.editarProducto);
router.get('error', mainController.error);

router.post('/productonuevo', uploadFile.single('image'), (req,res)=>
{
    //esto va aca??
    let listaBicisFile = fs.readFileSync(path.join(__dirname,'../data/data.json'));
    let listaBicis = JSON.parse(listaBicisFile);
    let ultimoElmnt = listaBicis[listaBicis.length-1];
    let productoNuevo={
    id: ultimoElmnt.id+1,
    titulo: req.body.nombre,
    descripcionCorta: req.body.descripcionProductoNuevo,
    descripcionDetallada: "Descripcion Ampliada", //req.body.descripcionAmpliada,
    colorDisponible: [ //req.body.color
        "white",
        "red",
        "black"
    ],
    tamañoDisponible: [ //req.body.tamanio
        "S",
        "M",
        "L"
    ],
    cantidadDisponible: req.body.cantidad,
    precio: req.body.precio,
    category: "visited", //req.body.category
    img: [
        req.file.filename
    ],
    alt: "bici"
    }
    
    listaBicis.push(productoNuevo);
    console.log(listaBicis);

    let salida = JSON.stringify(listaBicis);
    fs.writeFileSync(path.join(__dirname,'../data/data.json'), salida);

    res.redirect('/');
});

// agregar nuevo elemento al array (push) y luego hacer JSON.stringify()
// fileWrite. res.redirect....


module.exports = router;


// function guardarFotoProducto () {
//     let archivo = req.body.image;

// };