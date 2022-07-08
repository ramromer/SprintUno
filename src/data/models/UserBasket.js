module.exports = (sequelize, dataTypes) => {
  let alias = "UserBasket";
  let cols = {
    idUserBasket: {
      type: dataTypes.BIGINT(10).UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    idBasketFK: {
      type: dataTypes.BIGINT(10).UNSIGNED,
      allowNull: false,
    },
    idUsuariosFK: {
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

  const UserBasket = sequelize.define(alias, cols, config);

  UserBasket.associate = function (models) {

    UserBasket.belongsTo(models.User, {
          as: "UserBaskets", // nombre de la relacion
          foreignKey: "idUsuariosFK", // nombre de la FK 
          // foreignKey: "idUserFK", //Si no anda el codigo de la linea anterior, tal vez de esta otra forma??
        });
      };

  return UserBasket;
};
