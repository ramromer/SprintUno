

module.exports = (sequelize,dataTypes) => {
    let alias = 'Product';
    let cols = {
        idProduct: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        title:{
            type: dataTypes.STRING(45),
        },
        description:{
            type: dataTypes.STRING(45),
        },
        descriptionLong:{
            type: dataTypes.STRING(45),
        },
        stock:{
            type: dataTypes.INTEGER,
            allowNull: false,
        },
        price:{
            type: dataTypes.FLOAT,
            allowNull: false,
        },
        productscol:{
            type: dataTypes.STRING(45)
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