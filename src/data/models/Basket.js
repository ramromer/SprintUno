module.exports = (sequelize, dataTypes) => {
  let alias = "Basket";
  let cols = {
    idBasket: {
      type: dataTypes.BIGINT(10).UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    idProductFK: {
      type: dataTypes.BIGINT(10).UNSIGNED,
      allowNull: false,
    },
    amount: {
      type: dataTypes.BIGINT(100).UNSIGNED,
      allowNull: false,
    },
    idColorProductFK: {
      type: dataTypes.BIGINT(10).UNSIGNED,
      allowNull: false,
    },
    idUserFK: {
      type: dataTypes.BIGINT(10).UNSIGNED,
      allowNull: false,
    },
    idSizeProductFK: {
      type: dataTypes.BIGINT(10).UNSIGNED,
      allowNull: false,
    },
    updatedAt: {
      type: dataTypes.DATEONLY,
    },
    createdAt: {
      type: dataTypes.DATEONLY,
    },
  };
  let config = {
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
    deletedAt: false,
  };

  const Basket = sequelize.define(alias, cols, config);

  Basket.associate = function (models) {

    Basket.belongsTo(models.User, {
      as: "BasketUser", // nombre de la relacion
      foreignKey: "idUserFK", // nombre de la FK
      timestamps: true,
    });

    Basket.belongsTo(models.ColorProduct, {
      as: "BasketColorProduct", 
      foreignKey: "idColorProductFK", 
      timestamps: false,
    });

    Basket.belongsTo(models.Product, {
      as: "BasketProduct", 
      foreignKey: "idProductFK", 
      timestamps: true,
    });
    
    Basket.belongsTo(models.SizeProduct, {
      as: "BasketSizeProduct", 
      foreignKey: "idSizeProductFK", 
      timestamps: false,
    });

  };

  return Basket;
};
