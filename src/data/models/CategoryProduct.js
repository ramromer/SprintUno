module.exports = (sequelize, dataTypes) => {
  let alias = "CategoryProduct";
  let cols = {
    idCategoryProducts: {   //en esta linea esta en plural porque en la tabla esta plural el nombre
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

  const CategoryProduct = sequelize.define(alias, cols, config);

  CategoryProduct.associate = function (models) {

    CategoryProduct.belongsTo(models.Product, {
          as: "CategoryProducts", // nombre de la relacion
          foreignKey: "idProductsFK", // nombre de la FK 
        });
      };


//esta segunda relacion tambien va??

  // CategoryProduct.associate = function (models) {

  //   CategoryProduct.belongsTo(models.Product, {
  //         as: "CategoryProducts", // nombre de la relacion
  //         foreignKey: "idCategoryFK", // nombre de la FK 
  //       });
  //     };

  return CategoryProduct;
};
