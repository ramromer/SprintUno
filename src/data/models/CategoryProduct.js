module.exports = (sequelize, dataTypes) => {
  let alias = "CategoryProduct";
  let cols = {
    idCategoryProducts: {
      //en esta linea esta en plural porque en la tabla esta plural el nombre
      type: dataTypes.BIGINT(10).UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    idProductsFK: {
      type: dataTypes.BIGINT(10).UNSIGNED,
      allowNull: false,
    },
    idCategoryFK: {
      type: dataTypes.BIGINT(10).UNSIGNED,
      allowNull: false,
    },
  };
  let config = {
    timestamps: false,
  };

  const CategoryProduct = sequelize.define(alias, cols, config);

  CategoryProduct.associate = function (models) {
    CategoryProduct.belongsTo(models.Product, {
      as: "productCategoryProducts", // nombre de la relacion
      foreignKey: "idProductsFK", // nombre de la FK
    });


    CategoryProduct.belongsTo(models.Category, {
      as: "categoryCategoryProducts", // nombre de la relacion
      foreignKey: "idCategoryFK", // nombre de la FK
    });
  };

  return CategoryProduct;
};
