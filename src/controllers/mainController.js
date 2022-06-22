const fs = require("fs");
const path = require("path");

let mainController = {
  index: (req, res) => {
    let listaBicis = getListaBicis();
    res.render("index.ejs", { listaBicis: listaBicis });
  },

  carrito: (req, res) => {
    res.render("./products/carrito");
  },

  detalleProducto: (req, res) => {
    let listaBicis = getListaBicis();
    let reqId = listaBicis.find((element) => element.id == req.params.id);
    res.render("./products/detalleProducto", { producto: reqId });
  },

  productoNuevo: (req, res) => {
    res.render("./products/productoNuevo");
  },
  crearproductoNuevo: (req, res) => {
    if (req.file) {
      let listaBicisFile = fs.readFileSync(
        path.join(__dirname, "../data/data.json")
      );
      let listaBicis = JSON.parse(listaBicisFile);
      let ultimoElmnt = listaBicis[listaBicis.length - 1];
      let red;
      let black;
      let white;
      let tamanioS;
      let tamanioM;
      let tamanioL;
      if (req.body.colorRed) {
        red = "";
      } else {
        red = "disabled";
      }
      if (req.body.colorWhite) {
        black = "";
      } else {
        black = "disabled";
      }
      if (req.body.colorBlack) {
        white = "";
      } else {
        white = "disabled";
      }
      if (req.body.tamanioS) {
        tamanioS = "";
      } else {
        tamanioS = "disabled";
      }
      if (req.body.tamanioM) {
        tamanioM = "";
      } else {
        tamanioM = "disabled";
      }
      if (req.body.tamanioL) {
        tamanioL = "";
      } else {
        tamanioL = "disabled";
      }

      let productoNuevo = {
        id: ultimoElmnt.id + 1,
        titulo: req.body.nombre,
        descripcionCorta: req.body.descripcionProductoNuevo,
        descripcionDetallada: "Descripcion Ampliada",
        colorDisponible: { red: red, white: white, black: black },
        tamanio: { S: tamanioS, M: tamanioM, L: tamanioL },
        cantidadDisponible: req.body.cantidad,
        precio: req.body.precio,
        category: "visited",
        img: [req.file.filename],
        alt: "bici",
      };

      listaBicis.push(productoNuevo);

      let salida = JSON.stringify(listaBicis, null, " ");
      let fullPath = path.join(__dirname, "../data/data.json");

      fs.writeFileSync(fullPath, salida);

      res.redirect(`./detalleproducto/${productoNuevo.id}`);
    } else {
      res.redirect("/productonuevo");
    }
  },

  editarProducto: (req, res) => {
    let listaBicisFile = fs.readFileSync(
      path.join(__dirname, "../data/data.json")
    );
    let listaBicis = JSON.parse(listaBicisFile);
    let reqId = listaBicis.find((element) => element.id == req.params.id);
    res.render("./products/editarProducto", { producto: reqId });
  },

  modificarProducto: (req, res) => {
    let listaBicisFile = fs.readFileSync(
      path.join(__dirname, "../data/data.json")
    );
    let listaBicis = JSON.parse(listaBicisFile);
    // let ultimoElmnt = listaBicis[listaBicis.length - 1];
    let reqId = listaBicis.findIndex((element) => element.id == req.params.id);
    listaBicis[reqId].descripcionDetallada = req.body.descripcionProductoNuevo;
    listaBicis[reqId].cantidadDisponible = Number(req.body.cantidad);
    listaBicis[reqId].precio = req.body.precio;
    if (req.body.colorRed) {
      listaBicis[reqId].colorDisponible.red = "";
    } else {
      listaBicis[reqId].colorDisponible.red = "disabled";
    }
    if (req.body.colorWhite) {
      listaBicis[reqId].colorDisponible.white = "";
    } else {
      listaBicis[reqId].colorDisponible.white = "disabled";
    }
    if (req.body.colorBlack) {
      listaBicis[reqId].colorDisponible.black = "";
    } else {
      listaBicis[reqId].colorDisponible.black = "disabled";
    }
    if (req.body.tamanioS) {
      listaBicis[reqId].tamanio.S = "";
    } else {
      listaBicis[reqId].tamanio.S = "disabled";
    }
    if (req.body.tamanioM) {
      listaBicis[reqId].tamanio.M = "";
    } else {
      listaBicis[reqId].tamanio.M = "disabled";
    }
    if (req.body.tamanioL) {
      listaBicis[reqId].tamanio.L = "";
    } else {
      listaBicis[reqId].tamanio.L = "disabled";
    }
    console.log(req.body);
    let salida = JSON.stringify(listaBicis, null, " ");
    fs.writeFile(path.join(__dirname, "../data/data.json"), salida, () => {});

    res.redirect(`../detalleproducto/${listaBicis[reqId].id}`);
  },

  eliminarProducto: (req, res) => {
    let listaBicisFile = fs.readFileSync(
      path.join(__dirname, "../data/data.json")
    );
    let listaBicis = JSON.parse(listaBicisFile);

    let pto = listaBicis.find(function (pr) {
      return pr.id == req.params.id;
    });
    let i = listaBicis.indexOf(pto);
    let aBorrar = path.join(
      __dirname,
      "../../public/images/" + listaBicis[i].img[0]
    );
    fs.unlink(aBorrar, (err) => {
      if (err) {
        console.error(err);
        res.redirect("../editarproducto/" + pto.id);
        return;
      } else {
        listaBicis.splice(i, 1);
        let salida = JSON.stringify(listaBicis, null, " ");
        fs.writeFile(
          path.join(__dirname, "../data/data.json"),
          salida,
          () => {}
        );
        res.redirect("../productos");
      }
    });
  },

  productos: (req, res) => {
    let listaBicisFile = fs.readFileSync(
      path.join(__dirname, "../data/data.json")
    );
    let listaBicis = JSON.parse(listaBicisFile);
    res.render("./products/products.ejs", { listaBicis });
  },

  error: (req, res) => {
    res.render("error");
  },
  notFound: (req, res) => {
    res.render("notFound");
  },
  accesDenied: (req, res) => {
    res.render("accesDenied");
  },
};

function getListaBicis() {
  let listaBicisFile = fs.readFileSync(
    path.join(__dirname, "../data/data.json")
  );
  let listaBicis = JSON.parse(listaBicisFile);
  return listaBicis;
}

module.exports = mainController;
