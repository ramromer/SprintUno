

module.exports = (sequelize, dataTypes) => {
  let alias = "SizeProduct";
  let cols = {
    idSizeProduct: {
      type: dataTypes.BIGINT(10),
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },
    idSizeFK: {
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

  const SizeProduct = sequelize.define(alias, cols, config);

  
  SizeProduct.associate = function (models) {
    
    SizeProduct.belongsTo(models.Product, {
      as: "SizeProductProduct", // nombre de la relacion
      foreignKey: "idProductsFK", // nombre de la FK 
    });

    SizeProduct.belongsTo(models.Size, {
      as: "SizeProductsSize", // nombre de la relacion
      foreignKey: "idSizeFK", // nombre de la FK 
    });
  
  }

  return SizeProduct;
};
