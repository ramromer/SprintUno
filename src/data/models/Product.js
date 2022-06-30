const { DataTypes } = require("sequelize/types");

module.exports = (sequelize,dataTypes) => {
    let alias = 'Product';
    let cols = {
        idProduct: {
            type: DataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        title:{
            type: DataTypes.STRING(45),
        },
        description:{
            type: DataTypes.STRING(45),
        },
        descriptionLong:{
            type: DataTypes.STRING(45),
        },
        stock:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        price:{
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        productscol:{
            type: DataTypes.STRING(45)
        }

    };
    let config = {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    };

    const Product = sequelize.define(alias, cols, config);
    
    return Product;
}