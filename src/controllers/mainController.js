const db = require("../data/models");
const sequelize = require("Sequelize");

let mainController = {

  index: async (req, res) => {
    try {

       let { page, size } = req.query;

      const getPagination = (page, size ) => {
        const limit = size ? +size : 8;
        const offset = page ? page * limit : 0;
        return { limit, offset };
      };

      const getPagingData = (data, page, limit) => {
        const { count, rows } = data;
        const currentPage = page ? +page : 0;
        const totalPages =
          Math.ceil(count / limit) == Infinity ? 1 : Math.ceil(count / limit);
        return { count, rows, totalPages, currentPage };
      };

      const { limit, offset } = getPagination(page, size);

      let queryObject = {
        limit,
        offset,
        include: [
          { association: "productsImages" },
          { association: "productCategory" },
        ],
        distinct: "idProduct",
      };

      let products = await db.Product.findAndCountAll(queryObject);

      if (products === null) {
        res.status(204).send();
      } else {
        products = getPagingData(products, page, limit);
         
        if (!(products.totalPages == 1 || page >= products.totalPages - 1)) {
          products.next = parseInt(page ? page : 0) + 1
            
        }
      if (!(
          products.totalPages == 0 ||
          page >= products.totalPages ||
          page == undefined ||
          page == 0
        )
      ) {
        products.previus = page - 1;
      }
    
        res.render("index.ejs",{
          data: {
            products: products.rows,
            totalPages: products.totalPages,
            currentPage: products.currentPage,
            previus : products.previus,
            next: products.next,
          },
        });
      }
    } catch (err) {
      res.status(500).send({ error: err.toString() });
    }
  },
  buscar: async (req, res) => {
    try {
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
            {
              descriptionLong: { [sequelize.Op.like]: `%${req.query.search}%` },
            },
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
                  category: {
                    // campo donde se busca
                    [sequelize.Op.like]: `%${req.query.search}%`,
                  },
                },
              },
            ],
          },
        ],
      });

      let list = await Promise.all([products, categories]);

      list = list.flat(); // aplanar el array anidado

      res.render("./products/products", {
        listaBicis: list,
        busqueda: req.query.search,
      });
    } catch (err) {
      res.redirect(`../error}`);
      console.error(err);
    }
  },

  showCarrito: async (req, res) => {
    try {
      let listaBicis = await db.Basket.findAll({
        include: [
          {
            association: "BasketProduct",
            include: {
              association: "productsImages",
            },
          },
        ],

        where: {
          idUserFK: req.session.userLogged.idUser,
        },
      });
    
      if (listaBicis.length < 1) {
        //condición para mostrar mensaje de "no hay productos en tu carrito"
        res.render(`./products/carritoVacio`);
      }
      res.render(`./products/carrito`, { listaBicis });
    } catch (err) {
      err = err.toString();
      res.render(`./error`, { error: err.split(",") });
      console.log(err);
    }
  },
  carritoVaciar: async (req,res) =>{
    try{
      await db.Basket.destroy({where: [{idUserFK: req.session.userLogged.idUser}]})
      res.redirect('/')
    } catch (err) {
      err = err.toString();
      res.render(`./error`, { error: err.split(",") });
      console.log(err);
    }
  },
  carritoRemover: async (req,res) =>{
    try{
      await db.Basket.destroy({where: [{idUserFK: req.session.userLogged.idUser},{idProductFK: req.params.id}]})
      res.redirect('/carrito')
    } catch (err) {
      err = err.toString();
      res.render(`./error`, { error: err.split(",") });
      console.log(err);
    }
  },
  carrito: async (req, res) => {
    try {
      let colorProductId = await db.ColorProduct.findOne({
        where: [{ idColorFK: req.body.color }, { idProductsFK: req.params.id }],
      });

      let sizeProductId = await db.SizeProduct.findOne({
        where: [
          { idSizeFK: req.body.tamanio },
          { idProductsFK: req.params.id },
        ],
      });

      let [color, size] = await Promise.all([colorProductId, sizeProductId]);

      let producto = {
        idProductFK: req.params.id,
        idColorProductFK: color.idcolorProduct,
        idSizeProductFK: size.idSizeProduct,
        amount: req.body.cantidad,
        idUserFK: req.session.userLogged.idUser,
      };

      await db.Basket.create(producto);

      let listaBicis = await db.Basket.findAll({
        include: [
          {
            association: "BasketProduct",
            include: {
              association: "productsImages",
            },
          },
        ],

        where: {
          idUserFK: req.session.userLogged.idUser,
        },
      });

      res.render(`./products/carrito`, { listaBicis });
    } catch (err) {
      err = err.toString();
      res.render(`./error`, { error: err.split(",") });
      console.log(err);
    }
  },

  detalleProducto: async (req, res) => {
    db.Product.findOne({
      where: { idProduct: req.params.id },
      include: [
        { association: "productsImages" },
        { association: "product_ColorProduct" },
        { association: "productSizes" },
        { association: "productCategories" },
      ],
    })
      .then((product) => {
        if (product == undefined) {
          res.redirect("./products/noExiste");
        } else {
          res.render("./products/detalleProducto", { product: product });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },

  // in progress
  opciones: (req, res) => {
    res.render("./products/agregarOpciones");
  },

  productoNuevo: (req, res) => {
    res.render("./products/productoNuevo");
  },

  crearProductoNuevo: async (req, res) => {
    let colors = [];
    let sizes = [];
    let categories = [];
    let image = [];

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

    if (req.file) {
      image = req.file.filename;
    } else {
      image = "porDefecto.jpg";
    }

    let productoNuevo = {
      title: req.body.nombre,
      description: req.body.descripcionPN,
      descriptionLong: req.body.descripcionPN,
      stock: req.body.cantidad,
      price: req.body.precio,
      // discount: 0, no está en la BD, lo vamos a usar??
      productCategories: categories,
      productSizes: sizes,
      // product_ColorProduct es el nombre de la relación que quiero incluir al momento de crear el producto
      product_ColorProduct: colors,
      // productsImages es el nombre de la relación que quiero incluir al momento de crear el producto
      productsImages: { imageProduct: image },
    };

    db.Product.create(productoNuevo, {
      // debo usar include para agregar los registros que quiero crear en las tablas externas en base al producto
      include: [
        { model: db.ColorProduct, as: "product_ColorProduct" }, // se debe llamar el modelo de la tabla donde quiero crear el registros
        // y cuando la relacion tiene un alias se debe llamar la relación de la tabla actual como as:xxx
        { model: db.ImageProduct, as: "productsImages" },
        { model: db.SizeProduct, as: "productSizes" },
        { model: db.CategoryProduct, as: "productCategories" },
      ],
    })
      .then((product) => {
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
        { association: "product_ColorProduct" },
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
        description: req.body.descripcionEP,
        descriptionLong: req.body.descripcionEP,
        stock: req.body.cantidad,
        price: req.body.precio,
        // discount: 0, no está en la BD, lo vamos a usar??
        productCategories: categories,
        productSizes: sizes,
        // product_ColorProduct es el nombre de la relación que quiero incluir al momento de crear el producto
        product_ColorProduct: colors,
        // productsImages es el nombre de la relación que quiero incluir al momento de crear el producto
        productsImages: { imageProduct: req.file.filename },
      };
    } else {
      productoNuevo = {
        title: req.body.nombre,
        description: req.body.descripcionEP,
        descriptionLong: req.body.descripcionEP,
        stock: req.body.cantidad,
        price: req.body.precio,
        // discount: 0, no está en la BD, lo vamos a usar??
        productCategories: categories,
        productSizes: sizes,
        // product_ColorProduct es el nombre de la relación que quiero incluir al momento de crear el producto
        product_ColorProduct: colors,
        // productsImages es el nombre de la relación que quiero incluir al momento de crear el producto
        // productsImages: { imageProduct: req.file.filename },
      };
    }

    try {
      await db.Basket.destroy({
        where: {
          idProductFK: req.params.id,
          idColorProductFK: { [sequelize.Op.notIn]: colorsArray },
          idSizeProductFK: { [sequelize.Op.notIn]: sizesArray },
          idUserFK: req.session.userLogged.idUser,
        },
      });

      await db.Product.update(productoNuevo, {
        // debo usar include para agregar los registros que quiero crear en las tablas externas en base al producto
        where: { idProduct: req.params.id },
        include: [
          { model: db.ColorProduct, as: "product_ColorProduct" }, // se debe llamar el modelo de la tabla donde quiero crear el registros
          // y cuando la relacion tiene un alias se debe llamar la relación de la tabla actual como as:xxx
          { model: db.ImageProduct, as: "productsImages" },
          { model: db.SizeProduct, as: "productSizes" },
          { model: db.CategoryProduct, as: "productCategories" },
        ],
      });

      await db.ColorProduct.destroy({
        where: { idProductsFK: req.params.id },
        force: true,
      });

      await db.SizeProduct.destroy({
        where: { idProductsFK: req.params.id },
        force: true,
      });

      await db.ColorProduct.bulkCreate(colors);

      await db.SizeProduct.bulkCreate(sizes);

      if (fotico) {
        //borramos o no la foto anterior??
        await db.ImageProduct.update(
          { imageProduct: req.file.filename },
          { where: { idProductsFK: req.params.id } }
        );
      }
    } catch (err) {
      res.redirect(`../error}`);
      console.log(err);
    }

    res.redirect(`../../detalleProducto/${req.params.id}`);
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
    res.redirect("/");
  },

  productos: (req, res) => {
    db.Product.findAll({
      include: [{ association: "productsImages" }],
    })
      .then((products) => {
        res.render("./products/products.ejs", { listaBicis: products });
      })
      .catch((err) => {
        console.error(err);
      });
  },
  image: (req, res) => {
    let options = {
      root: __dirname + "../../../public/images/",
    };
    return res.sendFile(req.params.file, options, function (err) {
      if (err) {
        res.send(err);
      }
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

module.exports = mainController;
