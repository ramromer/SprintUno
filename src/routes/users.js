let express = require('express');
let router = express.Router();
let usersController = require('../controllers/usersControllers.js');
let multer = require('multer');
let path = require('path');
const db = require('../data/models');

const storage = multer.diskStorage({
    destination:  function(req, file, cb) {
        cb(null,'./public/users/avatars');
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
    body('email').custom((value, {req}) => {
        return new Promise((resolve, reject) => {
          db.User.findOne({where:{email:req.body.email}}).then(function( user){
            
            if(Boolean(user)) {
              reject(new Error('El correo ya estgá siendo usado por otro usuario'))
            }
            resolve(true)
          }).catch(err => {console.log(err); reject(new Error('Error en el servidor'))});
        });
      }), 
    body('emailRep').isEmail().withMessage('Por favor repite tu email'),
    body('bday').notEmpty().withMessage('Por favor ingrese su fecha de nacimiento'),
    body('user').notEmpty().withMessage('Por favor ingrese un nombre de usuario'),
    body('key').notEmpty().withMessage('Por favor ingrese una contraseña'),
    body('keyAgain').notEmpty().withMessage('Por favor repita la contraseña elegida'),
    body('user').custom((value, {req}) => {
        return new Promise((resolve, reject) => {
          db.User.findOne({where:{user:req.body.user}}).then(function( user){
            
            if(Boolean(user)) {
              reject(new Error('El usuario ya estgá siendo usado'))
            }
            resolve(true)
          }).catch(err => {console.log(err); reject(new Error('Error en el servidor'))});
        });
      })   
];
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

/* POST user */
router.post('/login',usersController.loginProcess);
router.post('/register', uploadFile.single('image'), validateUserRegister, usersController.registerWrite);

/* GET users listing. */
router.get('/login',guestMiddleware, usersController.login);
router.get('/register',guestMiddleware, usersController.register);
router.get('/edit/:id',authMiddleware, usersController.edit);//Editar usuario
router.put('/update/:id',authMiddleware, usersController.update);
router.delete('/delete/:id', authMiddleware, usersController.eliminarUsuario);//eliminar usuario
router.get('/profile',authMiddleware,usersController.profile);
router.get('/logout', usersController.logout);
router.get('*', usersController.notFound);


module.exports = router;