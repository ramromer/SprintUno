module.exports = (sequelize, dataTypes) => {
  let alias = "UserType";
  let cols = {
    idUserType: {
      type: dataTypes.BIGINT(10).UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    userType: {
      type: dataTypes.STRING(45),
      allowNull: false,
    },


  };
  let config = {
    timestamps: false
  };

  const UserType = sequelize.define(alias, cols, config);

  UserType.associate = function (models) {

    UserType.hasMany(models.User, {
          as: "UsersT", // nombre de la relacion
          foreignKey: "idUserTypeFK", // nombre de la FK 
          timestamps: false,
        });
      };

  return UserType;
};
