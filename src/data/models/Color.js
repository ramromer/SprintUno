module.exports = (sequelize, dataTypes) => {
  let alias = "Color";
  let cols = {
    idColor: {
      type: dataTypes.BIGINT(10),
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },
    color: {
      type: dataTypes.STRING(45),
      allowNull: false,
      unique: true
    }
  };

  let config = {
    timestamps: false,
    // deletedAt: false,
  };

  const Color = sequelize.define(alias, cols, config);

  Color.associate = function (models) {
    Color.hasMany(models.ColorProduct, {
        as: "ColorColorProducts",
        foreignKey: "idColorFK",
         timestamps: false,
      });
  };

  return Color;
};
