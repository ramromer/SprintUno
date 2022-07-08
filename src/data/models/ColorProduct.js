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
      allowNull: false
    },
    idProductsFK: {
      type: dataTypes.BIGINT(10),
      allowNull: false
    }
  };

  let config = {
    timestamps: false,
    // deletedAt: false,
  };

  const ColorProduct = sequelize.define(alias, cols, config);

  
  ColorProduct.associate = function (models) {
    
    ColorProduct.belongsTo(models.Product, {
      as: "colorProductsProduct", // nombre de la relacion
      foreignKey: "idProductsFK", // nombre de la FK 
    });

    ColorProduct.belongsTo(models.Color, {
      as: "colorProductsColor", // nombre de la relacion
      foreignKey: "idColorFK", // nombre de la FK 
    });
  
  }

  return ColorProduct;
};
