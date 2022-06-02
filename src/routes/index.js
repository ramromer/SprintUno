let express = require('express');
let router = express.Router();
let mainController = require('../controllers/mainController.js');
let multer = require('multer');
let path = require('path');
let loggerProducts = require('../middlewares/products_log');
const storage = multer.diskStorage({
    destination:  function(req, file, cb) {
        cb(null,'./public/images');
    },
    filename: function (req,file,cb){
        cb(null,`${Date.now()}_img_${path.extname(file.originalname)}`);
    }
})
const uploadFile=multer({storage:storage});

router.get('/', mainController.index);
router.get('/carrito', mainController.carrito);
router.get('/detalleproducto/:id', mainController.detalleProducto);
router.get('/productos', mainController.productos);
router.delete('/productos/:id',mainController.eliminarProducto);
router.get('/productonuevo', mainController.productoNuevo);
router.get('/editarproducto/:id', mainController.editarProducto);
router.get('error', mainController.error);

router.post('/productonuevo', loggerProducts, uploadFile.single('image'), mainController.crearproductoNuevo);

router.put('/editarproducto/:id', uploadFile.single('image'), mainController.modificarProducto);
//router.delete('/editarproducto/:id', mainController.borrarProducto);


module.exports = router;
