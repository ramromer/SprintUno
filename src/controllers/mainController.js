const fs = require("fs");
const path = require("path");
const db = require("../data/models");
const sequelize = require("Sequelize");

let mainController = {
  index: (req, res) => {
    db.Product.findAll({
      include: [
        { association: "productsImages" },
        { association: "productCategory" },
      ],
    })
      .then((products) => {
        res.render("index.ejs", { listaBicis: products });
      })
      .catch((err) => {
        console.error(err);
      });
  },

  buscar: async (req, res) => {
    let products = await db.Product.findAll({
      include: [
        {
          association: "productsImages",
        },
      ],
      where: {
        [sequelize.Op.or]: [
          { title: { [sequelize.Op.like]: `%${req.query.search}%` } },
          { description: { [sequelize.Op.like]: `%${req.query.search}%` } },
          { descriptionLong: { [sequelize.Op.like]: `%${req.query.search}%` } },
        ],
      },
    });

    let categories = await db.Product.findAll({
      include: [
        {
          association: "productsImages",
        },

        {
          association: "productCategories", // tabla intermedia
          required: true,

          include: [
            {
              association: "categoryCategoryProducts", // tabla categorias
              required: true,
              where: {
                category: { // campo donde se busca
                  [sequelize.Op.like]: `%${req.query.search}%`,
                },
              },
            },
          ],
        },
      ],
    });

    Promise.all([products, categories])
      .then((list) => {
        list = list.flat(); // aplanar el array anidado 
        res.render("./products/products", {
          listaBicis: list,
          busqueda: req.query.search,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },

  carrito: (req, res) => {
    db.Product.findAll({
      include: [{ association: "productsImages" }],
    })
      .then((products) => {
        res.render("./products/carrito", { listaBicis: products });
      })
      .catch((err) => {
        console.error(err);
      });
  },

  detalleProducto: async (req, res) => {
    db.Product.findOne({
      where: { idProduct: req.params.id },
      include: [
        { association: "productsImages" },
        { association: "productColors" },
        { association: "productSizes" },
        { association: "productCategories" },
      ],
    })
      .then((product) => {
        if (product == undefined) {
          res.redirect("./products/noExiste");
        } else {
          res.render("./products/detalleProducto", { producto: product });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },

  productoNuevo: (req, res) => {
    res.render("./products/productoNuevo");
  },
  crearproductoNuevo: async (req, res) => {
    let colors = [];
    let sizes = [];
    let categories = [];

    let colorsArray = [
      req.body.colorRed,
      req.body.colorBlack,
      req.body.colorWhite,
    ];
    let sizesArray = [req.body.tamanioS, req.body.tamanioM, req.body.tamanioL];
    let categoriesArray = ["1", "2"]; ////////////////////////////////////
    colorsArray = colorsArray.filter((color) => color !== undefined);
    sizesArray = sizesArray.filter((size) => size !== undefined);
    categoriesArray = categoriesArray.filter(
      (category) => category !== undefined
    );

    colorsArray.forEach((color) => {
      colors.push({ idColorFK: color });
    });

    sizesArray.forEach((size) => {
      sizes.push({ idSizeFK: size });
    });

    categoriesArray.forEach((category) => {
      categories.push({ idCategoryFK: category });
    });

    let productoNuevo = {
      title: req.body.nombre,
      description: req.body.descripcionProductoNuevo,
      descriptionLong: req.body.descripcionProductoNuevo,
      stock: req.body.cantidad,
      price: req.body.precio,
      // discount: 0, no está en la BD, lo vamos a usar??
      productCategories: categories,
      productSizes: sizes,
      // productColors es el nombre de la relación que quiero incluir al momento de crear el producto
      productColors: colors,
      // productsImages es el nombre de la relación que quiero incluir al momento de crear el producto
      productsImages: { imageProduct: req.file.filename },
    };

    db.Product.create(productoNuevo, {
      // debo usar include para agregar los registros que quiero crear en las tablas externas en base al producto
      include: [
        { model: db.ColorProduct, as: "productColors" }, // se debe llamar el modelo de la tabla donde quiero crear el registros
        // y cuando la relacion tiene un alias se debe llamar la relación de la tabla actual como as:xxx
        { model: db.ImageProduct, as: "productsImages" },
        { model: db.SizeProduct, as: "productSizes" },
        { model: db.CategoryProduct, as: "productCategories" },
      ],
    })
      .then((product) => {
        // res.render("./products/detalleProducto", { producto: product });
        res.redirect(`../../detalleProducto/${product.idProduct}`);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  editarProducto: (req, res) => {
    db.Product.findOne({
      where: { idProduct: req.params.id },
      include: [
        { association: "productsImages" },
        { association: "productColors" },
        { association: "productSizes" },
        { association: "productCategories" },
      ],
    })
      .then((product) => {
        if (product == undefined) {
          res.redirect("./products/noExiste");
        } else {
          res.render("./products/editarProducto", { product: product });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },

  modificarProducto: async (req, res) => {
    let colors = [];
    let sizes = [];
    let categories = [];

    let colorsArray = [
      req.body.colorRed,
      req.body.colorBlack,
      req.body.colorWhite,
    ];
    let sizesArray = [req.body.tamanioS, req.body.tamanioM, req.body.tamanioL];
    let categoriesArray = ["1", "2"]; ////////////////////////////////////
    colorsArray = colorsArray.filter((color) => color !== undefined);
    sizesArray = sizesArray.filter((size) => size !== undefined);
    categoriesArray = categoriesArray.filter(
      (category) => category !== undefined
    );

    colorsArray.forEach((color) => {
      colors.push({ idColorFK: color, idProductsFK: req.params.id });
    });

    sizesArray.forEach((size) => {
      sizes.push({ idSizeFK: size, idProductsFK: req.params.id });
    });

    categoriesArray.forEach((category) => {
      categories.push({ idCategoryFK: category, idProductsFK: req.params.id });
    });

    let fotico = req.file;
    let productoNuevo;
    if (fotico) {
      productoNuevo = {
        title: req.body.nombre,
        description: req.body.descripcionProductoNuevo,
        descriptionLong: req.body.descripcionProductoNuevo,
        stock: req.body.cantidad,
        price: req.body.precio,
        // discount: 0, no está en la BD, lo vamos a usar??
        productCategories: categories,
        productSizes: sizes,
        // productColors es el nombre de la relación que quiero incluir al momento de crear el producto
        productColors: colors,
        // productsImages es el nombre de la relación que quiero incluir al momento de crear el producto
        productsImages: { imageProduct: req.file.filename },
      };
    } else {
      productoNuevo = {
        title: req.body.nombre,
        description: req.body.descripcionProductoNuevo,
        descriptionLong: req.body.descripcionProductoNuevo,
        stock: req.body.cantidad,
        price: req.body.precio,
        // discount: 0, no está en la BD, lo vamos a usar??
        productCategories: categories,
        productSizes: sizes,
        // productColors es el nombre de la relación que quiero incluir al momento de crear el producto
        productColors: colors,
        // productsImages es el nombre de la relación que quiero incluir al momento de crear el producto
        // productsImages: { imageProduct: req.file.filename },
      };
    }

    db.Product.update(productoNuevo, {
      // debo usar include para agregar los registros que quiero crear en las tablas externas en base al producto
      where: { idProduct: req.params.id },
      include: [
        { model: db.ColorProduct, as: "productColors" }, // se debe llamar el modelo de la tabla donde quiero crear el registros
        // y cuando la relacion tiene un alias se debe llamar la relación de la tabla actual como as:xxx
        { model: db.ImageProduct, as: "productsImages" },
        { model: db.SizeProduct, as: "productSizes" },
        { model: db.CategoryProduct, as: "productCategories" },
      ],
    }).catch((err) => {
      console.log(err);
    });
    //aca borramos la relacion
    db.ColorProduct.destroy({
      where: { idProductsFK: req.params.id },
      force: true,
    }).catch((err) => {
      console.log(err);
    });
    //aca borramos la relacion
    db.SizeProduct.destroy({
      where: { idProductsFK: req.params.id },
      force: true,
    })
      .then((e) => {
        console.log(e);
      })
      .catch((err) => {
        console.log(err);
      });
    //aca creamos la nueva relacion
    db.ColorProduct.bulkCreate(colors).catch((err) => {
      console.log(err);
    });
    //aca creamos la nueva relacion
    db.SizeProduct.bulkCreate(sizes)
      .then((e) => {
        console.log(e);
      })
      .catch((err) => {
        console.log(err);
      });
    //borramos o no la foto anterior??
    if (fotico) {
      db.ImageProduct.update(
        { imageProduct: req.file.filename },
        { where: { idProductsFK: req.params.id } }
      )
        .then((e) => {
          console.log(e);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    db.Product.findOne({
      where: { idProduct: req.params.id },
      include: [
        { association: "productsImages" },
        { association: "productColors" },
        { association: "productSizes" },
        { association: "productCategories" },
      ],
    })
      .then((product) => {
        // res.render("./products/detalleProducto", { producto: product });
        res.redirect(`../../detalleProducto/${req.params.id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  eliminarProducto: async (req, res) => {
    db.ColorProduct.destroy({ where: { idProductsFK: req.params.id } }).catch(
      (err) => {
        console.log(err);
      }
    );
    db.SizeProduct.destroy({ where: { idProductsFK: req.params.id } })
      .then((e) => {
        console.log(e);
      })
      .catch((err) => {
        console.log(err);
      });
    db.ImageProduct.destroy({ where: { idProductsFK: req.params.id } })
      .then((e) => {
        console.log(e);
      })
      .catch((err) => {
        console.log(err);
      });
    db.CategoryProduct.destroy({ where: { idProductsFK: req.params.id } })
      .then((e) => {
        console.log(e);
      })
      .catch((err) => {
        console.log(err);
      });

    db.Product.destroy({ where: { idProduct: req.params.id } })
      .then((e) => {
        console.log(e);
      })
      .catch((err) => {
        console.log(err);
      });
    res.redirect("/")
  },

  productos: (req, res) => {
    db.Product.findAll({
      include: [
        { association: "productsImages" },
        // { association: "productColors" },
        // { association: "productSizes" },
        // { association: "productCategories" },
      ],
    })
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
