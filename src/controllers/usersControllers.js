const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const db = require('../data/models');

let usersController = {
  login: (req, res) => {
    return res.render("./users/login.ejs");
  },

  loginProcess:  (req, res) => {
     db.User.findOne({
      where:{
        user: req.body.user
      }
    }).then((user) => {
      user= user.dataValues
      console.log("23 ", user)
      if (user) {
        let isOkThePassword = bcryptjs.compareSync(req.body.key, user.key);
        if(isOkThePassword){
          delete user.key;
          req.session.userLogged = user;
          console.log("44", req.session.userLogged)
          if (req.body.recordarLogin) {
            res.cookie("user", req.body.user, { maxAge: 1000 * 60 * 60 }); // esto es seguro? podemos hashear la info o usar cookies seguras
          }
          return res.redirect("/users/profile");
        }else{
          return res.render("./users/login.ejs", {
            errors: {
              email: {
                msg: "Las credenciales son inválidas",
              }
            }
          });
        }
      };
      return res.render("./users/login.ejs", {
        errors: {
          email: {
            msg: "No se encuentra este email en nuestra base de datos",
          },
        },
      });  
      }).catch(err => console.log("51 error al consultar la base de datos", err));

  },

  profile:  (req, res) => {
    db.User.findOne({
      where:{
        user: req.session.userLogged.dataValues.user
      }
    }).then((user) => {
        console.log("61 ", user.dataValues)
        return res.render("./users/profile", {user: user.dataValues})
    }).catch(err => console.log("63 error al consultar la base de datos", err));
  

  },
  logout: (req, res) => {
    req.session.destroy();
    res.clearCookie("user");
    res.redirect("/");
  },
  register: (req, res) => {
    res.render("./users/register.ejs");
  },

  registerWrite: (req, res) => {

    let errores = validationResult(req);
    if (errores.errors.length > 0) {
      res.render("./users/register.ejs", {
        errores: errores.mapped(),
        oldData: req.body,

      });
    } else {

      let picture;
      let key = bcryptjs.hashSync(req.body.key, 10);
      if (req.file) {
        picture = req.file.filename;
      } else {
        picture = "porDefecto.jpg";
      }
      let usuarioNuevo = {
        fullname: req.body.fullName,
        addres: req.body.fullAddress,
        email: req.body.email,
        birthday: req.body.bday,
        user: req.body.user,
        key: key,
        userImage: picture,
        // type: req.body.userType,// es admin u otro tipo, no se ha creado en la BD
      };


      db.User.create(usuarioNuevo).then(()=> {
        return res.redirect(`./login/`)
      }).catch(error => res.send(error))
      
    }
  },

  notFound: (req, res) => {
    res.render("notFound");
  },
};

module.exports = usersController;
