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
      let productoNuevo = {
        id: ultimoElmnt.id + 1,
        titulo: req.body.nombre,
        descripcionCorta: req.body.descripcionProductoNuevo,
        descripcionDetallada: "Descripcion Ampliada", //req.body.descripcionAmpliada,
        colorDisponible: [
          //req.body.color
          "white",
          "red",
          "black",
        ],
        tamañoDisponible: [
          //req.body.tamanio
          "S",
          "M",
          "L",
        ],
        cantidadDisponible: req.body.cantidad,
        precio: req.body.precio,
        category: "visited", //req.body.category
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
    let reqId = listaBicis.find((element) => element.id == req.params.id);
    res.render("./products/editarProducto", { producto: reqId });
  },

  modificarProducto: (req, res) => {
    let listaBicisFile = fs.readFileSync(path.join(__dirname, '../data/data.json'));
    let listaBicis = JSON.parse(listaBicisFile);
    // let ultimoElmnt = listaBicis[listaBicis.length - 1];
    let reqId = listaBicis.findIndex(element => element.id == req.params.id);
    listaBicis[reqId].descripcionDetallada = req.body.descripcionProductoNuevo;
    listaBicis[reqId].cantidadDisponible = Number(req.body.cantidad);
    listaBicis[reqId].precio = req.body.precio;
    console.log(req.body);
    let salida = JSON.stringify(listaBicis, null, " ");
    fs.writeFile(path.join(__dirname, '../data/data.json'), salida, () => { });

    res.redirect(`../detalleproducto/${listaBicis[reqId].id}`);
},

productos: (req, res) => {
    res.render('./products/products.ejs', { listaBicis })
},

  error: (req, res) => {
    res.render("error");
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
