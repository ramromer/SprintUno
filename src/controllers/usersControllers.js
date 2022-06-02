const fs = require("fs");
const path = require("path");

const { validationResult } = require('express-validator');



let usersController = {
    login: (req, res) => {
        //let errors = validationResult(req);
        res.render('./users/login.ejs')
    },
    register: (req,res) => {
        res.render('./users/register.ejs');
    },

    registerWrite: (req, res) => {
        let fullPath = path.join(__dirname, "../data/usersData.json");
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('./users/register.ejs', { errors: errors.mapped() });
        } else {
            if (req.file) {
                let listaUsuariosFile = fs.readFileSync(fullPath);
                let listaUsuarios = JSON.parse(listaUsuariosFile);
                let ultimoElmnt = listaUsuarios[listaUsuarios.length - 1];

                let usuarioNuevo = {
                    id: ultimoElmnt.id + 1,
                    fullName: req.body.fullName,
                    fullAddress: req.body.fullAddress,
                    email: req.body.email,
                    bday: req.body.bday,
                    user: req.body.user,
                    key: req.body.key, //encriptar???
                    foto: req.body.foto,
                    dateCreation: null, //somekind of timestamp??
                };

                listaUsuarios.push(usuarioNuevo);

                let salida = JSON.stringify(listaUsuarios, null, " ");


                fs.writeFileSync(fullPath, salida);

                res.redirect(`./users/${usuarioNuevo.id}`);
            }
        }
    },

    notFound: (req, res) => {
        res.render('notFound')
    }
}

module.exports = usersController;