const fs = require("fs");
const path = require("path");
const db = require("../data/models");

let mainController = {
  index: (req, res) => {
    let listaBicis = getListaBicis();
    res.render("index.ejs", { listaBicis });
  },

  carrito: (req, res) => {
    res.render("./products/carrito");
  },

  detalleProducto: async (req, res) => {
    db.Product.findOne({
      where: { idProduct: req.params.id },
      include: [
        { association: "productsImages" },
        { association: "productColors" },
      ],
    })
      .then((product) => {
        console.log("24 ", product.productColors[1])
        res.render("./products/detalleProducto", { producto: product });
      })
      .catch((err) => {
        console.log(err);
      });
  },

  productoNuevo: (req, res) => {
    res.render("./products/productoNuevo");
  },
  crearproductoNuevo: async (req, res) => {
    let productoNuevo = {
      title: req.body.nombre,
      description: req.body.descripcionProductoNuevo,
      descriptionLong: "Descripcion Ampliada",
      stock: req.body.cantidad,
      price: req.body.precio,
      // discount: 0,
      productSizes: [
        {idSizeFK: 1},
        {idSizeFK: 2},
        {idSizeFK: 3},
      ],
      // productColors es el nombre de la relación que quiero incluir al momento de crear el producto (la realcion creada en el modelo de producto)
      productColors:[
                      {idColorFK: 1},
                      {idColorFK: 2},
                     {idColorFK: 3},
                    ],
      // productsImages es el nombre de la relación que quiero incluir al momento de crear el producto
      productsImages:{ imageProduct : req.file.filename}
    };

    db.Product.create(productoNuevo, {
      // debo usar include para agragar los registros que quiero crear en las tablas externas en base al producto
      include:[
                {model: db.ColorProduct, as: "productColors"}, // se debe llamar el modelo de la tabla donde quiero crear el registros
                                                              // y cuando la relacion tiene un alias se debe llamar la relación de la tabla actual como as:xxx
                {model: db.ImageProduct, as: "productsImages"},
                {model: db.SizeProduct, as: "productSizes"}
              ]
    }).then((product) => {
      res.render("./products/detalleProducto", { producto: product });
    }).catch((err) => {console.log(err);});

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
    db.Product.findAll()
      .then((products) => {
        res.render("./products/products.ejs", { listaBicis: products });
      })
      .catch((err) => {
        console.error(err);
      });
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

function getListaBicisDB() {
  db.Product.findAll()
    .then((products) => {
      return products;
    })
    .catch((err) => {
      console.error(err);
    });
}

module.exports = mainController;
