const path = require('path');

var listaUsers =[
    {
        usuarioId: 1,
        nombreCompleto: 'Usuario de Prueba',
        fechaNac: '01/01/2000',
    },
];

let usersController = {
    login: (req, res) => {
        res.render('login.ejs',{listaUsers:listaUsers})
    },
    register: (req, res) => {
        res.render('register.ejs',{listaUsers:listaUsers})
    },
};

module.exports = usersController;
