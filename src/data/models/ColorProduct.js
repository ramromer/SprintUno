// let m = require('../models')

module.exports = (sequelize, dataTypes) => {
  let alias = "ColorProduct";
  let cols = {
    idcolorProduct: {
      type: dataTypes.BIGINT(10),
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },
    idColorFK: {
      type: dataTypes.BIGINT(10),
      // references: {
      //   model: m.Color,
      //   key: 'idColor'
      // },
      allowNull: false
    },
    idProductsFK: {
      type: dataTypes.BIGINT(10),
      // references: {
      //   model: m.Product, 
      //   key: 'idProduct'
      // },
      allowNull: false
    }
  };

  let config = {
    timestamps: false,
    // deletedAt: false,
  };

  const ColorProduct = sequelize.define(alias, cols, config);

  // ColorProduct.associate = function (models) {
  //   models.Color.belongsToMany(models.Product, { through: ColorProduct });
  //   models.Product.belongsToMany(models.Color, { through: ColorProduct });
  // };

  return ColorProduct;
};
