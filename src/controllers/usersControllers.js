const fs = require("fs");
const path = require("path");
const bcryptjs = require('bcryptjs');
const User = require('../models/User');
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
        res.render('./users/login.ejs');
    },

    loginProcess: (req, res) => {

		let userToLogin = User.findByField('email', req.body.email);
		
		if(userToLogin) {
			let isOkThePassword = bcryptjs.compareSync(req.body.key, userToLogin.key);
			if (isOkThePassword) {
				delete userToLogin.key;
				req.session.userLogged = userToLogin;

				if(req.body.remember_user) {
					res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 })
				}

				return res.redirect('/users/profile');
			} 
			return res.render('./users/login.ejs', {
				errors: {
					email: {
						msg: 'Las credenciales son inválidas'
					}
				}
			});
		}

		return res.render('./users/login.ejs', {
			errors: {
				email: {
					msg: 'No se encuentra este email en nuestra base de datos'
				}
			}
		});
	},
    profile: (req, res) => {
     	return res.render('./users/profile.ejs', {
			user: req.session.userLogged
		});
	},
    logout: (req, res) => {
		req.session.destroy();
		res.redirect('/');
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
                let key = bcryptjs.hashSync(req.body.key, 10);
                if (req.file) {picture= [req.file.filename]}else{picture= 'porDefecto'};
                let usuarioNuevo = {
                    id: ultimoElmnt.id + 1,
                    fullName: req.body.fullName,
                    fullAddress: req.body.fullAddress,
                    email: req.body.email,
                    bday: req.body.bday,
                    user: req.body.user,
                    key: key,
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
    },

}

module.exports = usersController;