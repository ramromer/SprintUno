module.exports = (sequelize, dataTypes) => {
  let alias = "UserType";
  let cols = {
    idUserType: {
      type: dataTypes.BIGINT(10).UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    idTypeFK: {
      type: dataTypes.BIGINT(10).UNSIGNED,
      allowNull: false,
    },
    idUserFK: {
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

  const UserType = sequelize.define(alias, cols, config);

  UserType.associate = function (models) {

    UserType.belongsTo(models.User, {
          as: "UserTypes", // nombre de la relacion
          foreignKey: "idUserFK", // nombre de la FK 
        });
      };

  return UserType;
};
