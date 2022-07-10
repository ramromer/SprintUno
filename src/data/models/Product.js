module.exports = (sequelize, dataTypes) => {
  let alias = "Product";
  let cols = {
    idProduct: {
      type: dataTypes.BIGINT(10),
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    title: {
      type: dataTypes.STRING(45),
      allowNull: false,
    },
    description: {
      type: dataTypes.STRING(100),
      allowNull: false,
    },
    descriptionLong: {
      type: dataTypes.STRING(200),
    },
    stock: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: dataTypes.FLOAT,
      allowNull: false,
    },
    // vamos ausar el descuento, falta en la BD y en las vistas de detalle, crear y editar
    // discount: {
    //   type: dataTypes.FLOAT,
    // },
    createdAt: {
      type: dataTypes.DATEONLY,
    },
    updatedAt: {
      type: dataTypes.DATEONLY,
    },
  };
  let config = {
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
    deletedAt: false,
  };

  const Product = sequelize.define(alias, cols, config);

  Product.associate = function (models) {
    Product.hasMany(models.ImageProduct, {
      as: "productsImages",
      foreignKey: "idProductsFK",
      timestamps: true,
    });

    Product.hasMany(models.ColorProduct, {
      as: "productColors",
      foreignKey: "idProductsFK",
      timestamps: false,
    });

    Product.hasMany(models.SizeProduct, {
      as: "productSizes",
      foreignKey: "idProductsFK",
      timestamps: false,
    });

    Product.hasMany(models.CategoryProduct, {
      as: "productCategories",
      foreignKey: "idProductsFK",
      timestamps: false,
    });
    Product.belongsToMany(models.Category, {
      as: "productCategory",
      through:"CategoryProduct",
      foreignKey: "idProductsFK",
      otherKey:"idCategoryFK",
      timestamps: false,
    });
  };

  return Product;
};
