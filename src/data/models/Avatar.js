module.exports = (sequelize, dataTypes) => {
  let alias = "Avatar";
  let cols = {
    idAvatar: {
      type: dataTypes.BIGINT(10).UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    idUsuariosFK: {
      type: dataTypes.BIGINT(10).UNSIGNED,
      allowNull: false,
    },
    avatar: {
      type: dataTypes.STRING(45),
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
          as: "avatarUser", // nombre de la relacion
          foreignKey: "idUsuariosFK", // nombre de la FK 
        });
      };

  return Avatar;
};
