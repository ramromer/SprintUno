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

  const Category = sequelize.define(alias, cols, config);

  // Category.associate = function (models) {

  //   Category.belongsTo(models.User, {
  //         as: "Categorys", // nombre de la relacion
  //         foreignKey: "idUsuariosFK", // nombre de la FK 
  //         // foreignKey: "idUserFK", //Si no anda el codigo de la linea anterior, tal vez de esta otra forma??
  //       });
  //     };

  return Category;
};
