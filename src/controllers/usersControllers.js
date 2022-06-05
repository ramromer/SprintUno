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
function getUsers() {
    let listaUsers=getListaUsers();
    let _users_ = [];
    for(let i=0; i<listaUsers.length; i++){_users_.push(listaUsers[i].user);};
    return _users_;
}
function getEmails() {
    let listaUsers=getListaUsers();
    let _emails_ = [];
    for(let i=0; i<listaUsers.length; i++){_emails_.push(listaUsers[i].email);};
    return _emails_;
}

let usersController = {
    login: (req, res) => {
        res.render('./users/login.ejs')
    },
    register: (req,res) => {
        let emails = getEmails();
        let usuarios = getUsers();
        res.render('./users/register.ejs',{usuarios:usuarios,emails:emails});
    },

    registerWrite: (req, res) => {
        let emails = getEmails();
        let usuarios = getUsers();
        let fullPath = path.join(__dirname, "../data/usersData.json");
        let errores = validationResult(req);
        if (errores.errors.length > 0) {
            res.render('./users/register.ejs', { errores: errores.mapped(), oldData: req.body, usuarios:usuarios, emails:emails });
        } else {
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