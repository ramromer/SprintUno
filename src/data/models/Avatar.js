module.exports = (sequelize, dataTypes) => {
  let alias = "Avatar";
  let cols = {
    idAvatar: {
      type: dataTypes.BIGINT(10).UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    avatar: {
      type: dataTypes.STRING(45),
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

  const Avatar = sequelize.define(alias, cols, config);

  Avatar.associate = function (models) {

    Avatar.belongsTo(models.User, {
          as: "Avatars", // nombre de la relacion
          foreignKey: "idUsuariosFK", // nombre de la FK 
          // foreignKey: "idUserFK", //Si no anda el codigo de la linea anterior, tal vez de esta otra forma??
        });
      };

  return Avatar;
};
