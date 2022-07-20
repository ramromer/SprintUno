module.exports = (sequelize, dataTypes) => {
  let alias = "Size";
  let cols = {
    idSize: {
      type: dataTypes.BIGINT(10),
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },
    Size: {
      type: dataTypes.STRING(45),
      allowNull: false,
      unique: true
    }
  };

  let config = {
    timestamps: false,
    // deletedAt: false,
  };

  const Size = sequelize.define(alias, cols, config);

  Size.associate = function (models) {
    Size.hasMany(models.SizeProduct, {
        as: "SizeProducts",
        foreignKey: "idSizeFK",
         timestamps: false,
      });
  };

  return Size;
};
