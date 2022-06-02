var express = require('express');
var router = express.Router();
var usersController = require('../controllers/usersControllers.js');
let multer = require('multer');
let path = require('path');

const storage = multer.diskStorage({
    destination:  function(req, file, cb) {
        cb(null,'./public/images');
    },
    filename: function (req,file,cb){
        cb(null,`${Date.now()}_img_${path.extname(file.originalname)}`);
    }
})
const uploadFile=multer({storage:storage});

const {body} = require('express-validator');

const validateUserRegister = [
    body('fullName').notEmpty().withMessage('Por favor ingresa tu nombre completo'),
    body('fullAddress').notEmpty().withMessage('Por favor ingresa tu direccion'),
    body('email').isEmail().withMessage('Por favor ingresa un email valido'),
    body('emailRep').isEmail().withMessage('Por favor repite tu email'),
    body('bday').notEmpty().withMessage('Por favor ingrese su fecha de nacimiento'),
    body('user').notEmpty().withMessage('Por favor ingrese un nombre de usuario'),
    body('key').notEmpty().withMessage('Por favor ingrese una contraseña'),
    body('keyAgain').notEmpty().withMessage('Por favor repita la contraseña elegida'),   
]
router.post('/register', validateUserRegister, uploadFile.single('image'), usersController.registerWrite);

/* GET users listing. */
router.get('/login', usersController.login);
router.get('/register', usersController.register);
router.get('*', usersController.notFound);


module.exports = router;
