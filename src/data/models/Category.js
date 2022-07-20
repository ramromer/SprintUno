module.exports = (sequelize, dataTypes) => {
  let alias = "Category";
  let cols = {
    idCategory: {
      type: dataTypes.BIGINT(10).UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    category: {
      type: dataTypes.STRING(45),
      allowNull: false,
    },
  };
  let config = {
    timestamps: false,
  };

  const Category = sequelize.define(alias, cols, config);

  Category.associate = function (models) {
    Category.hasMany(models.CategoryProduct, {
      as: "Categories", // nombre de la relacion
      foreignKey: "idCategoryFK", // nombre de la FK
    });

    Category.belongsToMany(models.Product, {
      as: "categoryProduct",
      through: "CategoryProduct",
      foreignKey: "idCategoryFK",
      otherKey: "idProductsFK",
      timestamps: false,
    });
  };

  return Category;
};
