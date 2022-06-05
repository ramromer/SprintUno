const fs = require("fs");
const path = require("path");

const { validationResult } = require('express-validator');

function getListaUsers() {
    let listaUsersFile = fs.readFileSync(
      path.join(__dirname, "../data/usersData.json")
    );
    let listaUsers = JSON.parse(listaUsersFile);
    return listaUsers;
  }

let usersController = {
    login: (req, res) => {
        res.render('./users/login.ejs')
    },
    register: (req,res) => {
        res.render('./users/register.ejs');
    },

    registerWrite: (req, res) => {
        let fullPath = path.join(__dirname, "../data/usersData.json");
        let errores = validationResult(req);
        if (errores.errors.length > 0) {
            //  res.send(errores.mapped());
            res.render('./users/register.ejs', { errores: errores.mapped() });
        } else {
            // res.send('todo bien');
            
            let listaUsers = getListaUsers();
                let ultimoElmnt = listaUsers[listaUsers.length - 1];
                let picture;
                if (req.file) {picture= [req.file.filename]}else{picture= 'porDefecto'};
                let usuarioNuevo = {
                    id: ultimoElmnt.id + 1,
                    fullName: req.body.fullName,
                    fullAddress: req.body.fullAddress,
                    email: req.body.email,
                    bday: req.body.bday,
                    user: req.body.user,
                    key: req.body.key, //encriptar???
                    foto: picture,
                    dateCreation: null, //somekind of timestamp??
                };

                listaUsers.push(usuarioNuevo);

                let salida = JSON.stringify(listaUsers, null, " ");


                fs.writeFileSync(fullPath, salida);

                res.redirect(`./users/${usuarioNuevo.id}`);
            
        }
    },

    notFound: (req, res) => {
        res.render('notFound')
    }
}

module.exports = usersController;