

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
            type: dataTypes.STRING(100),
        },
        descriptionLong:{
            type: dataTypes.STRING(200),
        },
        stock:{
            type: dataTypes.INTEGER,
            allowNull: false,
        },
        price:{
            type: dataTypes.FLOAT,
            allowNull: false,
        },
        createdAt:{
            type:dataTypes.DATEONLY,
        },
        updatedAt:{
            type:dataTypes.DATEONLY,
        }

    };
    let config = {
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
        deletedAt: false
    };

    const Product = sequelize.define(alias, cols, config);
    
    return Product;
}