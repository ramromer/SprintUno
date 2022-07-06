module.exports = (sequelize, dataTypes) => {
  let alias = "Product";
  let cols = {
    idProduct: {
      type: dataTypes.BIGINT(10),
      primaryKey: true,
      autoIncrement: true,
      unique: true
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
    discount: {
      type: dataTypes.FLOAT,
    },
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

    Product.belongsToMany(models.Color, {
        as: "productColors",
        through: "ColorProduct",
        foreignKey: "idProductsFK",
        otherKey: "idColorFK",
        timestamps: false
    })

  };

  return Product;
};
