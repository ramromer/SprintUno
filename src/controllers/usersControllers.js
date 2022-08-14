const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const db = require("../data/models");

let usersController = {
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
        idUserTypeFK: req.body.userType,
      };

      db.User.create(usuarioNuevo)
        .then(() => {
          return res.redirect(`./login/`);
        })
        .catch((error) => res.send(error));
    }
  },
  login: (req, res) => {
    return res.render("./users/login.ejs");
  },
  loginProcess: (req, res) => {
    db.User.findOne({
      where: {
        email: req.body.user,
      },
    }).then((user) => {
      if (user) {
        let isOkThePassword = bcryptjs.compareSync(req.body.key, user.key);
        if (isOkThePassword) {
          delete user.key;
          req.session.userLogged = user;

          if (req.body.recordarLogin == true) {
            res.cookie("user", req.body.user, { maxAge: 1000 * 60 * 60 }); // esto es seguro? podemos hashear la info o usar cookies seguras
          }
          res.redirect("/");
        } else {
          return res.render("./users/login.ejs", {
            errors: {
              email: {
                msg: "Las credenciales son inválidas",
              },
            },
          });
        }
      } else {
        res
          .render("./users/login.ejs", {
            errors: {
              email: {
                msg: "La combinación de usuario y contraseña son invalidos o inexistente",
              },
            },
          })
          .catch((err) =>
            console.log(" error al consultar la base de datos", err)
          );
      }
    });
  },
  profile: (req, res) => {
    db.User.findOne({
      where: {
        email: req.session.userLogged.email,
      },
    })
      .then((user) => {
        return res.render("./users/profile", { user: user.dataValues });
      })
      .catch((err) => console.log(" error al consultar la base de datos", err));
  },
  edit: function (req, res) {
    db.User.findByPk(req.params.id).then(function (Us) {
      if (Us != undefined) {
        res.render("./users/userEdit.ejs", { Us: Us });
      } else {
        res.redirect("./users/register.ejs");
      }
    });
  },
  update: function (req, res) {
    let queryUserUpdate = {};

    if (req.body.user) {
      queryUserUpdate.user = req.body.user;
    }
    if (req.body.bday) {
      queryUserUpdate.birthday = req.body.bday;
    }
    if (req.body.fullAddress) {
      queryUserUpdate.addres = req.body.fullAddress;
    }
    if (req.body.fullName) {
      queryUserUpdate.fullName = req.body.fullName;
    }
    if (req.file) {
      queryUserUpdate.userImage = req.file.filename;
    }
    if (req.body.key ) {
      queryUserUpdate.key = bcryptjs.hashSync(req.body.key, 10);
    }
    console.log(queryUserUpdate, "  ", queryUserUpdate.length )
    if (Object.keys(queryUserUpdate).length > 0) {
    console.log("queryUserUpdate")

      db.User.update(queryUserUpdate, {
        where: {
          idUser: req.params.id,
        },
      })
        .then((result) => {
          res.redirect("/");
        })
        .catch((err) => console.log(err));
    } else {
      res.redirect("/");
    }
  },
  logout: (req, res) => {
    req.session.destroy();
    res.clearCookie("user");
    res.redirect("/");
  },
  eliminarUsuario: async (req, res) => {
    db.User.destroy({ where: { idUser: req.params.id } }).catch((err) => {
      console.log(err);
    });
    res.redirect("/");
  },
  image: (req, res) => {
    let options = {
      root: __dirname + "../../../public/users/avatars/",
    };
    return res.sendFile(req.params.file, options, function (err) {
      if (err) {
        res.send(err);
      }
    });
  },
  askRegister: (req, res) => {
    db.User.findOne({
      where: {
        email: req.params.email,
      },
    })
      .then((user) => {
        if (user !== null) {
          res.send(JSON.stringify(1));
        } else {
          res.send(JSON.stringify(0));
        }
      })
      .catch((err) => console.log(err));
  },
  notFound: (req, res) => {
    res.render("notFound");
  },
};

module.exports = usersController;
