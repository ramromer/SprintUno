var express = require('express');
var router = express.Router();
var usersController = require('../controllers/usersControllers.js');

const {body} = require('express-validator');

const validateUserRegister = [
    body('fullName').notEmpty().withMessage('Por favor ingresa tu nombre completo'),
    body('fullAddress').notEmpty().withMessage('Por favor ingresa tu direccion'),
    body('email').notEmpty().withMessage('Por favor ingresa tu email'),
    body('email').isEmail().withMessage('Por favor ingresa un email valido'),
    body('emailRep').notEmpty().withMessage('Por favor repite tu email'),
    body('emailRep').isEmail().withMessage('Por favor repite un email valido'),
    body('bday').notEmpty().withMessage('Por favor ingrese su fecha de nacimiento'),
    body('user').notEmpty().withMessage('Por favor ingrese un nombre de usuario'),
    body('key').notEmpty().withMessage('Por favor ingrese una contraseña'),
    body('keyAgain').notEmpty().withMessage('Por favor repita la contraseña elegida'),   
]

/* GET users listing. */
router.get('/login', usersController.login);
router.get('/register', validateUserRegister, usersController.register);
router.get('*', usersController.notFound);

module.exports = router;
